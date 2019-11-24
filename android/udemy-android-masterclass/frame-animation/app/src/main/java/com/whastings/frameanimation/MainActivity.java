package com.whastings.frameanimation;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.view.MotionEvent;
import android.widget.ImageView;

public class MainActivity extends AppCompatActivity {
    private AnimationDrawable batAnimation;
    private ImageView batImageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        batImageView = findViewById(R.id.bat_image);
        batImageView.setBackgroundResource(R.drawable.bat_anim);
        batAnimation = (AnimationDrawable) batImageView.getBackground();
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        batAnimation.start();

        Handler mHandler = new Handler();
        mHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                batAnimation.stop();
            }
        }, 5000);
        return super.onTouchEvent(event);
    }
}
