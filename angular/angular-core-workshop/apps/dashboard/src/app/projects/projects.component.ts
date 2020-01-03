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
  selectedProject: Project
  // Can render observables in template when piped to `async`
  // Convention is to suffix observable variable with `$`
  projects$: Observable<Project[]>

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getProjects()
    this.resetProject()
  }

  cancel() {
    this.resetProject()
  }

  resetProject() {
    const emptyProject: Project = {
      id: null,
      title: '',
      details: '',
      percentComplete: 0,
      approved: false,
    }
    this.selectedProject = emptyProject
  }

  getProjects() {
    this.projects$ = this.projectsService.all()
  }

  deleteProject(project: Project) {
    this.projectsService.delete(project.id)
      // Must subscribe for the request to actually be issued.
      // Then reload projects to get updated list
      // TODO: How to remove from local state w/o making new request?
      .subscribe(() => this.getProjects())
  }

  createProject(project: Project) {
    this.projectsService.create(project)
      .subscribe(() => {
        this.getProjects()
        this.resetProject()
      })
  }

  updateProject(project: Project) {
    this.projectsService.update(project)
      .subscribe(() => {
        this.getProjects()
        this.resetProject()
      })
  }

  saveProject(project: Project) {
    if (project.id) {
      this.updateProject(project)
    } else {
      this.createProject(project)
    }
  }

  // No need to bind event handling method to component instance
  // Could also get DOM event if passed $event from template
  selectProject(project) {
    this.selectedProject = project
  }

}
