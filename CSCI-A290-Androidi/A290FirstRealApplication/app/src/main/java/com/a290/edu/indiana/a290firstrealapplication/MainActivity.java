package com.a290.edu.indiana.a290firstrealapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MenuInflater;
import android.content.Intent;
import android.content.DialogInterface;
import android.widget.Button;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.util.Log;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private static final String TAG = "StartMainActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        View continueButton = findViewById(R.id.continueButton);
        continueButton.setOnClickListener(this::onClick);
        View aboutButton = findViewById(R.id.aboutButton);
        aboutButton.setOnClickListener(this::onClick);

        View exitButton = findViewById(R.id.exitButton);
        exitButton.setOnClickListener(this::onClick);

        View newGameButton = findViewById(R.id.newButton);
        newGameButton.setOnClickListener(this::onClick);



    }


    @Override
    public void onClick(View view) {
        switch (view.getId()) {
//            case R.id.btn_New:
//                openNewGameDialog();
//                break;
            case R.id.aboutButton:
                Intent i = new Intent(MainActivity.this, FirstRealAppAboutActivity.class);
                startActivity(i);
                break;
            case R.id.continueButton:
                finish();
                break;
            case R.id.exitButton:
                finish();
                break;
            case R.id.newButton:
                openNewGameDialog();
                break;
        }

    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_first_real_app_settings, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected (MenuItem item){
        switch (item.getItemId()) {
            case R.id.SettingsMenu:
                startActivity (new Intent(this, FirstRealAppPrefsActivity.class));
                return true;
            /*We can add more items to this switch-case construct, if and when we need them*/
        }
        return false;
    }

    private void openNewGameDialog() {
        new AlertDialog.Builder(this)
                .setTitle(R.string.newGameTitle)
                .setItems(R.array.difficulty,
                        new android.content.DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialoginterface,
                                                int i) {
                                startGame(i);
                            }
                        })
                .show();
    }

    private void startGame(int i){
        Log.d(TAG, "Clicked on " + i);
        Intent intent = new Intent(this, FirstRealAppGameActivity.class);
        intent.putExtra(FirstRealAppGameActivity.KEY_DIFFICULTY, i);
        startActivity(intent);
    }
}