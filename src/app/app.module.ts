import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DummyComponent } from './dummy/dummy.component';
import { NameGeneratorsComponent } from './name-generators/name-generators.component';
import { NameGeneratorComponent } from './name-generator/name-generator.component';
import { NameGeneratorsService } from './name-generators.service';

@NgModule({
  declarations: [
    AppComponent,
    DummyComponent,
    NameGeneratorsComponent,
    NameGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [NameGeneratorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
