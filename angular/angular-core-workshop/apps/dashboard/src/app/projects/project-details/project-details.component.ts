import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '@workshop/core-data';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  @Output() saved = new EventEmitter()
  @Output() cancelled = new EventEmitter()
  currentProject: Project

  // Can also make a setter an `@Input`
  @Input() set project(value: Project) {
    this.currentProject = Object.assign({}, value)
  }
}
