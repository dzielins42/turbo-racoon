import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DummyComponent } from './dummy/dummy.component';
import { NameGeneratorsComponent } from './name-generators/name-generators.component';
import { NameGeneratorComponent } from './name-generator/name-generator.component';
import { NameGeneratorsService } from './name-generators.service';
import { MaterialTestComponent } from './material-test/material-test.component';

@NgModule({
  declarations: [
    AppComponent,
    DummyComponent,
    NameGeneratorsComponent,
    NameGeneratorComponent,
    MaterialTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [NameGeneratorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
