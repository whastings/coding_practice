import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '@workshop/ui-login'


// Matched component will render into <router-outlet> in app.component.html
const routes: Routes = [
  // `loadChildren` will cause code for that route to be lazy-loaded
  // Then that module's routing module will figure out which component to render
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule' },
  { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
