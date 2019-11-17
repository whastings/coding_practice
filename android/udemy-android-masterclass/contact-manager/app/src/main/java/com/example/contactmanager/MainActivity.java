package com.example.contactmanager;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.example.contactmanager.data.DatabaseHandler;
import com.example.contactmanager.model.Contact;

import java.util.List;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private Button addButton;
    private DatabaseHandler dbHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        addButton = findViewById(R.id.add_button);
        addButton.setOnClickListener(this);
        dbHandler = new DatabaseHandler(MainActivity.this);

        List<Contact> contactList = dbHandler.getAllContacts();
        for (Contact contact : contactList) {
            Log.d("MainActivity", "contact: " + contact.getId() + " " + contact.getName());
        }
    }

    @Override
    public void onClick(View view) {
        Contact jeremy = new Contact("Jeremy", "1112223333");
        dbHandler.addContact(jeremy);
        Contact jason = new Contact("Jason", "5556667777");
        dbHandler.addContact(jason);
    }
}
