package com.example.listfragment.data;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.listfragment.R;

import java.util.List;

public class CourseArrayAdapter extends ArrayAdapter<Course> {
    private Context context;
    private List<Course> courses;

    public CourseArrayAdapter(Context context, int resource, List<Course> courses) {
        super(context, resource, courses);
        this.context = context;
        this.courses = courses;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Course course = courses.get(position);
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Activity.LAYOUT_INFLATER_SERVICE);

        View view = inflater.inflate(R.layout.course_list_item, null);
        ImageView imageView = view.findViewById(R.id.course_image);
        imageView.setImageResource(course.getImageResourceId(context));
        TextView textView = view.findViewById(R.id.course_name);
        textView.setText(course.getName());

        return view;
    }
}
