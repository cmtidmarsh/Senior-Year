package com.a290.cmtidmar.edu.indiana.a290finalproject;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.PopupMenu;
import android.widget.TextView;

public class PlayActivityViewController extends AppCompatActivity {
    Button menuBtn, submitBtn, questionBtn;
    FlashCardAndGameModel flashCardAndGameModel = new FlashCardAndGameModel();
    TextView previousTextView, numCorrectTextView, questionTextView;
    EditText userInput;

    // Variable Initialization
    String lastEnteredText = "";
    int counter = 0;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_play);

        // Instantiating buttons
        menuBtn =  findViewById(R.id.menuBtn);
        submitBtn = findViewById(R.id.submitBtn);
        questionBtn = findViewById(R.id.questionBtn);


        // Instantiating TextViews
        previousTextView =  findViewById(R.id.previousTextView);
        numCorrectTextView = findViewById(R.id.numCorrectTextView);
        questionTextView = findViewById(R.id.questionTextView);

        // Instantiating EditText
        userInput = findViewById(R.id.userInput);

        // When "show question" button is clicked, the question will display
        questionBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                    String question = flashCardAndGameModel.getNextQuestion();
                    questionTextView.setText(question);;
            }
        });

        // submits user input to model
        submitBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // boolean to compare user input and correct answer no matter the capitalization
                boolean userCorrect = lastEnteredText.equalsIgnoreCase(flashCardAndGameModel.getAnswer());
                // sets user's input to the last entered input
                lastEnteredText = userInput.getText().toString();
                // User submits wrong answer
                if  (!userCorrect){
                    previousTextView.setText(lastEnteredText);
                }
                // User submits right answer
                else{
                    counter =+ 1;
                    String counterToString = Integer.toString(counter);
                    numCorrectTextView.setText(counterToString);
                    previousTextView.setText(lastEnteredText);
                    previousTextView.setBackgroundColor(Color.rgb(196, 250, 187));
                }
            }

        });

        // Setting onClick behavior to the button
        menuBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Initializing the popup menu and giving the reference as current context
                PopupMenu popupMenu = new PopupMenu(PlayActivityViewController.this, menuBtn);

                // Inflating popup menu from popup_menu.xml file
                popupMenu.getMenuInflater().inflate(R.menu.popup_menu, popupMenu.getMenu());
                popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                    @Override
                    public boolean onMenuItemClick(MenuItem menuItem) {
                        switch (menuItem.getItemId()){
                            case R.id.home:
                                Intent homeIntent = new Intent(PlayActivityViewController.this, MainActivity.class);
                                startActivity(homeIntent);
                            case R.id.learn:
                                Intent learnIntent = new Intent(PlayActivityViewController.this, LearnActivityViewController.class);
                                startActivity(learnIntent);
                            case R.id.play:
                                break;
                        }
                        return true;
                    }
                });
                // Showing the popup menu
                popupMenu.show();
            }
        });
    }


}