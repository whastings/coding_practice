import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '@workshop/core-data';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {
  // `@Input()` decorator marks property as settable from outside the class (e.g. parent component)
  @Input() projects: Project[]
  @Input() readonly = false
  // `@Output` decorator marks custom event that component can send to its parent
  // Custom event property must hold an instance of EventEmitter
  // It will have an `emit` method
  // And whatever you pass it will be available in parent's event handler as `$event`
  @Output() selected = new EventEmitter()
  @Output() deleted = new EventEmitter()
  primaryColor = 'red'
}
