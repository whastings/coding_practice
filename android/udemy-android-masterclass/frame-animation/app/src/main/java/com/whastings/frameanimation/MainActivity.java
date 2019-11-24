package com.whastings.frameanimation;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.view.MotionEvent;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

public class MainActivity extends AppCompatActivity {
    private AnimationDrawable batAnimation;
    private ImageView frameBatImageView;
    private ImageView fadeBatImageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        frameBatImageView = findViewById(R.id.bat_image);
        frameBatImageView.setBackgroundResource(R.drawable.bat_anim);
        batAnimation = (AnimationDrawable) frameBatImageView.getBackground();

        fadeBatImageView = findViewById(R.id.bat_image2);
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

        mHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Animation fadeAnimation = AnimationUtils.loadAnimation(
                    getApplicationContext(),
                    R.anim.fadein_animation
                );
                fadeBatImageView.startAnimation(fadeAnimation);
            }
        }, 50);

        return super.onTouchEvent(event);
    }
}
