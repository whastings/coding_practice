package com.example.contactmanager;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.example.contactmanager.adapter.ContactsRecyclerViewAdapter;
import com.example.contactmanager.data.DatabaseHandler;
import com.example.contactmanager.model.Contact;

import java.util.List;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private Button addButton;
    private Button deleteButton;
    private Button updateButton;

    private RecyclerView recyclerView;
    private ContactsRecyclerViewAdapter contactsRecyclerViewAdapter;

    private List<Contact> contactsList;
    private DatabaseHandler dbHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dbHandler = new DatabaseHandler(MainActivity.this);
        contactsList = dbHandler.getAllContacts();
        for (Contact contact : contactsList) {
            Log.d("MainActivity", "contact: " + contact.getId() + " " + contact.getName());
        }

        addButton = findViewById(R.id.add_button);
        addButton.setOnClickListener(this);
        deleteButton = findViewById(R.id.delete_button);
        deleteButton.setOnClickListener(this);
        updateButton = findViewById(R.id.update_button);
        updateButton.setOnClickListener(this);

        recyclerView = findViewById(R.id.contacts_list);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        contactsRecyclerViewAdapter = new ContactsRecyclerViewAdapter(MainActivity.this, contactsList);
        recyclerView.setAdapter(contactsRecyclerViewAdapter);
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
        for (int i = 1; i <= 20; i++) {
            Contact contact = new Contact("Contact " + i, i + "000000");
            dbHandler.addContact(contact);
        }
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
