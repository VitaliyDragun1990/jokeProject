import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { JokeComponent } from './joke/joke.component';
import { JokeListComponent } from './joke-list/joke-list.component';
import { JokeFormComponent } from './joke-form/joke-form.component';
import { CardHoverDirective } from './card-hover.directive';
import { CleanPipe } from './clean.pipe';
import { ModelFormComponent } from './model-form/model-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReactiveModelFormComponent } from './reactive-model-form/reactive-model-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import {SimpleService} from './simple-service';
import { HttpTestComponent } from './http-test/http-test.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import {SearchService} from './search.service';


@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent,
    JokeFormComponent,
    CardHoverDirective,
    CleanPipe,
    ModelFormComponent,
    ReactiveModelFormComponent,
    TemplateFormComponent,
    ChildComponent,
    ParentComponent,
    HttpTestComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [SimpleService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
