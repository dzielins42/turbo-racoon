import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DummyComponent } from './dummy/dummy.component';
import { NameGeneratorsComponent } from './name-generators/name-generators.component';
import { MaterialTestComponent } from './material-test/material-test.component';

const routes: Routes = [
  { path: '', component:AppComponent },
  { path: 'dummy', component:DummyComponent },
  { path: 'name-generators', component:NameGeneratorsComponent },
  { path: 'material-test', component:MaterialTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
