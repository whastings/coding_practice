package com.example.listfragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.ListFragment;

import com.example.listfragment.data.Course;
import com.example.listfragment.data.CourseArrayAdapter;
import com.example.listfragment.data.CourseData;

import java.util.List;

public class MainFragment extends ListFragment {
    List<Course> courses = new CourseData().courseList();

    public MainFragment() {
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        CourseArrayAdapter adapter = new CourseArrayAdapter(
                getActivity(),
                R.layout.course_list_item,
                courses
        );
        setListAdapter(adapter);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.main_fragment, container, false);

        return view;
    }
}
