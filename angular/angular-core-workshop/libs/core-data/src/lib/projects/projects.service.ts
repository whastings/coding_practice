import { Injectable } from '@angular/core';
import { Project } from './project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  // Angular dependency injection will automatically pass `HttpClient` instance to constructor
  constructor(private httpClient: HttpClient ) { }

  all() {
    // Returns an Observable
    return this.httpClient.get<Project[]>('http://localhost:3000/projects')
  }

  create(project: Project) {
    return this.httpClient.post('http://localhost:3000/projects', project)
  }

  update(project: Project) {
    return this.httpClient.patch(`http://localhost:3000/projects/${project.id}`, project)
  }

  delete(projectId: string) {
    return this.httpClient.delete(`http://localhost:3000/projects/${projectId}`)
  }
}
