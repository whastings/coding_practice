package com.example.contactmanager.data;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseErrorHandler;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.contactmanager.model.Contact;
import com.example.contactmanager.util.Util;

public class DatabaseHandler extends SQLiteOpenHelper {
    public DatabaseHandler(Context context) {
        super(context, Util.DATABASE_NAME, null, Util.DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String createContactTable = "CREATE TABLE " + Util.TABLE_NAME + "(" +
                Util.KEY_ID + " INTEGER PRIMARY KEY," +
                Util.KEY_NAME + " TEXT," +
                Util.KEY_PHONE_NUMBER + " TEXT)";
        db.execSQL(createContactTable);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String dropTable = "DROP TABLE IF EXISTS " + Util.TABLE_NAME;
        db.execSQL(dropTable);
        onCreate(db);
    }

    public void addContact(Contact contact) {
        SQLiteDatabase db = this.getWritableDatabase();

        ContentValues values = new ContentValues();
        values.put(Util.KEY_NAME, contact.getName());
        values.put(Util.KEY_PHONE_NUMBER, contact.getPhoneNumber());

        db.insert(Util.TABLE_NAME, null, values);
        db.close();
    }

    public Contact getContact(int id) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.query(
                Util.TABLE_NAME,
                new String[]{ Util.KEY_ID, Util.KEY_NAME, Util.KEY_PHONE_NUMBER },
                Util.KEY_ID + "= ?",
                new String[] { String.valueOf(id) },
                null, null, null
        );

        if (cursor != null) {
            cursor.moveToFirst();
            Contact contact = new Contact();
            contact.setId(Integer.parseInt(cursor.getString(0)));
            contact.setName(cursor.getString(1));
            contact.setPhoneNumber(cursor.getString(2));

            return contact;
        }

        return null;
    }
}
