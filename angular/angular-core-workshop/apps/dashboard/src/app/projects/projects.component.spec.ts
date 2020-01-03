import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@workshop/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { Project } from '@workshop/core-data';
import { By } from '@angular/platform-browser';

describe('ProjectsComponent', () => {
  // Component to test
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let debugElement: DebugElement

  const emptyProject: Project = {
    id: null,
    title: '',
    details: '',
    percentComplete: 0,
    approved: false,
  }

  beforeEach(async(() => {
    // Create a test Angular module
    // Must have declarations and imports that
    // component under test relies on
    TestBed.configureTestingModule({
      declarations: [
        ProjectsComponent,
        ProjectsListComponent,
        ProjectDetailsComponent,
      ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
    })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent)
    component = fixture.componentInstance
    debugElement = fixture.debugElement
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should select a project', () => {
    component.selectProject(emptyProject)
    expect(component.selectedProject).toBe(emptyProject)
  })

  it('should display a heading', () => {
    const h1 = debugElement.query(By.css('h1'))
    expect(h1.nativeElement.innerText).toBe('Projects')
  })
});
