package com.a290.edu.indiana.a290firstrealapplication;
import android.icu.number.Precision;
import android.os.Bundle;
import android.preference.PreferenceActivity;

public class FirstRealAppPrefsActivity extends PreferenceActivity {

    /* For the settings toolbar activity which includes a music checkbox and hints checkbox */
        @Override
        protected void onCreate(Bundle savedInstanceState){
            super.onCreate(savedInstanceState);
            addPreferencesFromResource(R.xml.settings);
        }
    }
