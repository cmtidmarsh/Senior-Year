package com.a290.edu.indiana.a290firstrealapplication;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Paint.FontMetrics;
import android.graphics.Paint.Style;
import android.util.Log;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.animation.AnimationUtils;

public class FirstRealAppPuzzleView extends View {
    private static final String TAG = "FirstRealAppPuzzleView";
    // instantiated game activity
    private final FirstRealAppGameActivity game;

    /* constructor */
    public FirstRealAppPuzzleView(Context context) {
        super(context);
        this.game = (FirstRealAppGameActivity) context;
        setFocusable(true);
        setFocusableInTouchMode(true);
    }

    private float width; //width of one tile
    private float height; //height of one tile
    private int selX; //X index of selection
    private int selY; //Y index of selection
    private final Rect selRect = new Rect();

    /* size of board depending on difficulty */
    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        width = w/9f;
        height = h/9f;
        getRect(selX, selY, selRect);
        Log.d(TAG, "onSizeChanged: width " + width + ", height " + height);
        super.onSizeChanged(w, h, oldw, oldh);
    }
    /* gets an individual tile */
    private void getRect(int x, int y, Rect rect) {
        rect.set((int) (x * width), (int) (y * height),
                (int) (x * width + width), (int) (y * height + height));
    }

    /* function to draw the board onto the view */
    @Override
    protected void onDraw(Canvas canvas) {
//Draw the background first
        Paint background = new Paint();
        background.setColor(getResources().getColor(R.color.puzzleBackground));
        canvas.drawRect(0, 0, getWidth(), getHeight(), background);
//Draw the board
        //First, define the colors for the grid lines.
        Paint dark = new Paint();
        dark.setColor(getResources().getColor(R.color.puzzleDark));
        Paint hilite = new Paint();
        hilite.setColor(getResources().getColor(R.color.puzzleHiLite));
        Paint light = new Paint();
        light.setColor(getResources().getColor(R.color.puzzleLight));
        // Second, draw the minor grid lines (order is important)
        for (int i =0; i < 9; i++) {
            canvas.drawLine(0, i * height, getWidth(), i * height, light);
            canvas.drawLine(0, i * height + 1, getWidth(), i * height + 1, hilite);
            canvas.drawLine(i * width, 0, i * width, getHeight(), light);
            canvas.drawLine(i * width + 1, 0, i * width + 1, getHeight(), hilite);
        }
        //Third, draw the major grid lines (order is important)
        for (int i = 0; i < 9; i++) {
            if(i % 3 != 0)
                continue;
            canvas.drawLine(0, i * height, getWidth(), i * height, dark);
            canvas.drawLine(0, i * height + 1, getWidth(), i * height + 1, hilite);
            canvas.drawLine(i * width, 0, i * width, getHeight(), dark);
            canvas.drawLine(i * width + 1, 0, i * width + 1, getHeight(), hilite);
        }

//Draw the numbers, after the game difficulty is selected
        // Define color and style for numbers
        Paint foreground = new Paint(Paint.ANTI_ALIAS_FLAG);
        foreground.setColor(getResources().getColor(
                R.color.puzzleForeground));
        foreground.setStyle(Style.FILL);
        foreground.setTextSize(height * 0.75f);
        foreground.setTextScaleX(width / height);
        foreground.setTextAlign(Paint.Align.CENTER);
        // Draw the number in the center of the tile
        FontMetrics fm = foreground.getFontMetrics();
        // Centering in X: use alignment (and X at midpoint)
        float x = width / 2;
        // Centering in Y: measure ascent/descent first
        float y = height / 2 - (fm.ascent + fm.descent) / 2;
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                canvas.drawText(this.game.getTileString(i, j), i
                        * width + x, j * height + y, foreground);
            }
        }
    }
}
