package com.example.contactmanager;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import com.example.contactmanager.data.DatabaseHandler;
import com.example.contactmanager.model.Contact;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private Button addButton;
    private Button deleteButton;
    private Button updateButton;
    private ListView contactsListView;

    private ArrayList<String> contactStringsList;
    private ArrayAdapter<String> contactsArrayAdapter;
    private DatabaseHandler dbHandler;
    private TextView contactsCountText;

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
        contactsListView = findViewById(R.id.contacts_list);

        contactStringsList = new ArrayList<>();

        dbHandler = new DatabaseHandler(MainActivity.this);
        List<Contact> contactList = dbHandler.getAllContacts();
        for (Contact contact : contactList) {
            Log.d("MainActivity", "contact: " + contact.getId() + " " + contact.getName());
            contactStringsList.add(contact.getName());
        }
        contactsArrayAdapter = new ArrayAdapter<>(
                this,
                android.R.layout.simple_list_item_1,
                contactStringsList
        );
        contactsListView.setAdapter(contactsArrayAdapter);

        contactsCountText = findViewById(R.id.contacts_count_text);
        contactsCountText.setText("Contacts: " + dbHandler.getCount());
        contactsListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long l) {
                Log.d("MainActivity", "Contact Clicked: " + contactStringsList.get(position));
            }
        });
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
