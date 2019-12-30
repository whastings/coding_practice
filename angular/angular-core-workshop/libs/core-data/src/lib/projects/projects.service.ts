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
    return this.httpClient.get('http://localhost:3000/projects')
  }
}
