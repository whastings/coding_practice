package com.example.listfragment;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.listfragment.data.Course;
import com.example.listfragment.data.CourseData;


public class CourseDetailFragment extends Fragment {
    Course course;

    public CourseDetailFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Bundle bundle = getArguments();
        if (bundle != null && bundle.containsKey("course_id")) {
            int position = bundle.getInt("course_id");
            course = new CourseData().courseList().get(position);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_course_detail, container, false);

        if (course != null) {
            TextView courseNameTextView = view.findViewById(R.id.detail_course_name);
            courseNameTextView.setText(course.getName());

            ImageView courseImageView = view.findViewById(R.id.detail_course_image);
            courseImageView.setImageResource(course.getImageResourceId(getActivity()));
        }

        return view;
    }
}
