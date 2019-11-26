package com.example.listfragment;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;

import android.content.Intent;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity implements CourseListFragment.Callbacks {
    private boolean isTwoPane = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (findViewById(R.id.detail_container) != null) {
            isTwoPane = true;
        }
    }

    @Override
    public void onItemSelected(int position) {
        if (isTwoPane) {
            CourseDetailFragment fragment = new CourseDetailFragment();
            Bundle bundle = new Bundle();
            bundle.putInt("course_id", position);
            fragment.setArguments(bundle);

            FragmentManager fragmentManager = getSupportFragmentManager();
            fragmentManager.beginTransaction().replace(R.id.detail_container, fragment).commit();
        } else {
            Intent intent = new Intent(MainActivity.this, CourseDetailActivity.class);
            intent.putExtra("course_id", position);
            startActivity(intent);
        }
    }
}
