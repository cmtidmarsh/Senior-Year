package com.a290.edu.indiana.a290firstrealapplication;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.content.Intent;
import android.content.DialogInterface;

public class FirstRealAppAboutActivity extends Activity {

    /* Class for the "About" button, a pop-up will be displayed with a description of the game */
    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.layout_first_real_app_about);

    }

}
