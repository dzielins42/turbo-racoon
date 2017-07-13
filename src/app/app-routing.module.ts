import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DummyComponent } from './dummy/dummy.component';

const routes: Routes = [
  { path: '', component:AppComponent },
  { path: 'dummy', component:DummyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
