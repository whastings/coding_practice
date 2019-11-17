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
    private Button deleteButton;
    private Button updateButton;
    private DatabaseHandler dbHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        addButton = findViewById(R.id.add_button);
        addButton.setOnClickListener(this);
        deleteButton = findViewById(R.id.delete_button);
        deleteButton.setOnClickListener(this);
        updateButton = findViewById(R.id.update_button);
        updateButton.setOnClickListener(this);

        dbHandler = new DatabaseHandler(MainActivity.this);
        List<Contact> contactList = dbHandler.getAllContacts();
        for (Contact contact : contactList) {
            Log.d("MainActivity", "contact: " + contact.getId() + " " + contact.getName());
        }
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.add_button:
                this.addContacts();
                break;
            case R.id.delete_button:
                this.deleteContacts();
                break;
            case R.id.update_button:
                this.updateContact();
                break;
        }
    }

    private void addContacts() {
        Contact jeremy = new Contact("Jeremy", "1112223333");
        dbHandler.addContact(jeremy);
        Contact jason = new Contact("Jason", "5556667777");
        dbHandler.addContact(jason);
    }

    private void deleteContacts() {
        List<Contact> contactList = dbHandler.getAllContacts();
        for (Contact contact : contactList) {
            dbHandler.deleteContact(contact);
        }
    }

    private void updateContact() {
        Contact contact = dbHandler.getContact(1);
        contact.setName("New Jeremy");
        contact.setPhoneNumber("8675309");

        int updateRow = dbHandler.updateContact(contact);

        Log.d("MainActivity", "contact updated: " + updateRow);
    }
}
