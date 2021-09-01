import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayContactComponent } from './display-contact';

const routes: Routes = [
  {
    path: 'contact/:id',
    component: DisplayContactComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
