import { Component, OnInit } from '@angular/core';

@Component({
  // Name of tag to render this component: <app-projects></app-projects>
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  // Instance variables
  // Are available in component's template
  projects = [
    {
      id: '1',
      title: 'Project One',
      details: 'This is a sample project',
      percentComplete: 20,
      approved: false,
    },
    {
      id: '2',
      title: 'Project Two',
      details: 'This is a sample project',
      percentComplete: 40,
      approved: false,
    },
    {
      id: '3',
      title: 'Project Three',
      details: 'This is a sample project',
      percentComplete: 100,
      approved: true,
    },
  ]
  primaryColor = 'red'
  selectedProject

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.selectedProject = null
  }

  // No need to bind event handling method to component instance
  // Could also get DOM event if passed $event from template
  selectProject(project) {
    this.selectedProject = project
  }

}
