package com.whastings.activitylifecycle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

// AppCompatActivity is like Activity but supports more backwards compatibility
public class MainActivity extends AppCompatActivity {
    private Button showGuess;
    private EditText enterGuess;
    private final int REQUEST_CODE = 2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("LIFECYCLE", "onCreate() called");
        setContentView(R.layout.activity_main);

        enterGuess = findViewById(R.id.guess_field);
        showGuess = findViewById(R.id.button_guess);
        showGuess.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String guess = enterGuess.getText().toString().trim();

                if (!guess.isEmpty()) {
                    Intent intent = new Intent(MainActivity.this, ShowGuess.class);
                    intent.putExtra("guess", guess);
                    // As opposed to startActivity(), which doesn't allow receiving a result back
                    startActivityForResult(intent, REQUEST_CODE);
                } else {
                    Toast.makeText(MainActivity.this, "Enter guess", Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    // To handle response from ShowGuess
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_CODE && resultCode == RESULT_OK) {
            String message = data.getStringExtra("message_back");
            Toast.makeText(MainActivity.this, message, Toast.LENGTH_LONG).show();
        }
    }

    @Override
    protected void onStart() {
        super.onStart();

        Log.d("LIFECYCLE", "onStart() called");
    }

    @Override
    protected void onPostResume() {
        super.onPostResume();

        Log.d("LIFECYCLE", "onResume() called");
    }

    @Override
    protected void onPause() {
        super.onPause();

        Log.d("LIFECYCLE", "onPause() called");
    }

    @Override
    protected void onStop() {
        super.onStop();

        Log.d("LIFECYCLE", "onStop() called");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        Log.d("LIFECYCLE", "onDestroy() called");
    }
}
