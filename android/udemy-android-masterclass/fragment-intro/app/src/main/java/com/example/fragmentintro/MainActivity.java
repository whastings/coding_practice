package com.example.fragmentintro;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FragmentManager fragmentManager = getSupportFragmentManager();
        Fragment fragment = fragmentManager.findFragmentById(R.id.main_layout);

        if (fragment == null) {
            fragment = new MainFragment();
            fragmentManager.beginTransaction()
                    .add(R.id.main_layout, fragment)
                    .commit();
        }
    }
}
