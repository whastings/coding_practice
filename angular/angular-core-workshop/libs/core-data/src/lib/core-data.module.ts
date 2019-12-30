import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from './projects/projects.service';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    ProjectsService,
  ],
})
export class CoreDataModule {}
