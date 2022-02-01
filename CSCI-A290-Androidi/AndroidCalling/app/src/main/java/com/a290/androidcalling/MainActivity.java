package com.a290.androidcalling;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Switch;
import android.widget.TextView;


public class MainActivity extends AppCompatActivity {

    TextView helloUniverseTextView, newFontTextView;
    Button firstButton, secondButton;
    CheckBox myFirstCheckBox;
    Switch myFirstSwitch;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        helloUniverseTextView = findViewById(R.id.helloUniverseTextView);
//        newFontTextView = findViewById(R.id.newFontTextView);
//        firstButton = findViewById(R.id.firstButton);
//        secondButton = findViewById(R.id.secondButton);
//        myFirstCheckBox = findViewById(R.id.myFirstCheckBox);
//        myFirstSwitch = findViewById(R.id.myFirstSwitch);
    }
}