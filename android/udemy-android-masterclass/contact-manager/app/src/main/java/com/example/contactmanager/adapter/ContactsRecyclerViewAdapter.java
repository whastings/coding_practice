package com.example.contactmanager.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.contactmanager.R;
import com.example.contactmanager.model.Contact;

import java.util.List;

public class ContactsRecyclerViewAdapter extends RecyclerView.Adapter<ContactsRecyclerViewAdapter.ContactViewHolder> {
    private Context context;
    private List<Contact> contactList;

    public ContactsRecyclerViewAdapter(Context context, List<Contact> contactList) {
        this.context = context;
        this.contactList = contactList;
    }

    @NonNull
    @Override
    public ContactViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(
                R.layout.contact_row,
                parent,
                false
        );
        return new ContactViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ContactViewHolder holder, int position) {
        Contact contact = contactList.get(position);
        holder.nameTextView.setText(contact.getName());
        holder.phoneNumberTextView.setText(contact.getPhoneNumber());
    }

    @Override
    public int getItemCount() {
        return contactList.size();
    }

    public class ContactViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        public TextView nameTextView;
        public TextView phoneNumberTextView;
        public ImageView contactIcon;

        public ContactViewHolder(@NonNull View itemView) {
            super(itemView);

            nameTextView = itemView.findViewById(R.id.name);
            phoneNumberTextView = itemView.findViewById(R.id.phone_number);
            contactIcon = itemView.findViewById(R.id.contact_icon);

            itemView.setOnClickListener(this);
            contactIcon.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            int position = getAdapterPosition();
            Contact contact = contactList.get(position);
            switch (view.getId()) {
                case R.id.contact_icon:
                    Log.d("Contact", "icon clicked: " + contact.getName());
                    break;
                default:
                    Log.d("Contact", "contact clicked: " + contact.getName());
                    break;
            }
        }
    }
}
