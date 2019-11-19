package com.example.contactmanager;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

public class ContactActivity extends AppCompatActivity {
    private TextView nameTextView;
    private TextView phoneNumberTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact);

        nameTextView = findViewById(R.id.name_text);
        phoneNumberTextView = findViewById(R.id.phone_number_text);

        Intent intent = getIntent();
        String contactName = intent.getStringExtra("contactName");
        String contactPhoneNumber = intent.getStringExtra("contactPhoneNumber");

        nameTextView.setText(contactName);
        phoneNumberTextView.setText(contactPhoneNumber);
    }
}
