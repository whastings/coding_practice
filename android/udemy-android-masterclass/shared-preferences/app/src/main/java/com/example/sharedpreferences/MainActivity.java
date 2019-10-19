package com.example.sharedpreferences;

import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private static final String MESSAGE_ID = "messages_prefs";
    private EditText messageEditText;
    private TextView messageTextView;
    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        messageEditText = findViewById(R.id.message_editText);
        messageTextView = findViewById(R.id.message_textView);
        button = findViewById(R.id.button);

        button.setOnClickListener(this);

        SharedPreferences sharedPerfs = getSharedPreferences(MESSAGE_ID, MODE_PRIVATE);
        String initialMessage = sharedPerfs.getString("message", "");

        messageTextView.setText(initialMessage);
    }

    @Override
    public void onClick(View view) {
        String message = messageEditText.getText().toString().trim();

        messageTextView.setText(message);

        SharedPreferences sharedPerfs = getSharedPreferences(MESSAGE_ID, MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPerfs.edit();
        editor.putString("message", message);
        editor.apply();
    }
}
