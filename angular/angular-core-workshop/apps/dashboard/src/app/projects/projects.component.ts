import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '@workshop/core-data'
import { Observable } from 'rxjs';

@Component({
  // Name of tag to render this component: <app-projects></app-projects>
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  // Instance variables
  // Are available in component's template
  primaryColor = 'red'
  // Can render observables in template when piped to `async`
  // Convention is to suffix observable variable with `$`
  projects$: Observable<Project[]>
  selectedProject: Project

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getProjects()
  }

  cancel() {
    this.selectedProject = null
  }

  getProjects() {
    this.projects$ = this.projectsService.all()
  }

  // No need to bind event handling method to component instance
  // Could also get DOM event if passed $event from template
  selectProject(project) {
    this.selectedProject = project
  }

}
