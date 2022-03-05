package com.a290.cmtidmar.edu.indiana.a290finalproject;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.PopupMenu;
import android.widget.TextView;

public class LearnActivityViewController extends AppCompatActivity {
    Button menuBtn, questionBtn, answerBtn;
    TextView questionTextView, answerTextView;

    // Boolean Variable Initialization
    boolean isClicked = false;

    // model instantiation
    FlashCardAndGameModel flashCardAndGameModel = new FlashCardAndGameModel();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_learn);

        // Button instantiation
        menuBtn =  findViewById(R.id.menuBtn);
        questionBtn = findViewById(R.id.questionBtn);
        answerBtn = findViewById(R.id.answerBtn);

        // TextView instantiation
        questionTextView = findViewById(R.id.questionTextView);
        answerTextView = findViewById(R.id.answerTextView);

        questionBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                isClicked = true;
                if (isClicked == true){
                    String question = flashCardAndGameModel.getNextQuestion();
                    questionTextView.setText(question);
                    answerTextView.setText(" ");

                } else {
                    answerTextView.setText(" ");
                }

            }
        });
        answerBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (isClicked == true){
                    String answer = flashCardAndGameModel.getAnswer();
                    answerTextView.setText(answer);

                } else{
                    answerTextView.setText(" ");
                }


            }
        });




        // Setting onClick behavior to the button
        menuBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Initializing the popup menu and giving the reference as current context
                PopupMenu popupMenu = new PopupMenu(LearnActivityViewController.this, menuBtn);

                // Inflating popup menu from popup_menu.xml file
                popupMenu.getMenuInflater().inflate(R.menu.popup_menu, popupMenu.getMenu());
                popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                    @Override
                    public boolean onMenuItemClick(MenuItem menuItem) {
                        switch (menuItem.getItemId()){
                            case R.id.home:
                                Intent homeIntent = new Intent(LearnActivityViewController.this, MainActivity.class);
                                startActivity(homeIntent);
                                break;
                            case R.id.learn:
                                break;
                            case R.id.play:
                                Intent playIntent = new Intent(LearnActivityViewController.this, PlayActivityViewController.class);
                                startActivity(playIntent);
                                break;
                        }
                        return true;
                    }
                });
                // Showing popup menu
                popupMenu.show();
            }
        });
    }
}