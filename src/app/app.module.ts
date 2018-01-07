import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {JokeComponent} from './joke/joke.component';
import {JokeListComponent} from './joke-list/joke-list.component';
import {JokeFormComponent} from './joke-form/joke-form.component';
import {CardHoverDirective} from './card-hover.directive';
import {CleanPipe} from './clean.pipe';
import {ModelFormComponent} from './model-form/model-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReactiveModelFormComponent} from './reactive-model-form/reactive-model-form.component';
import {TemplateFormComponent} from './template-form/template-form.component';
import {ChildComponent} from './child/child.component';
import {ParentComponent} from './parent/parent.component';
import {SimpleService} from './simple-service';
import {HttpTestComponent} from './http-test/http-test.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {SearchComponent} from './search/search.component';
import {SearchService} from './search/search.service';
import {SearchMusicService} from './searchMusic/services/search-music.service';
import {SearchMusicComponent} from './searchMusic/search-music/search-music.component';
import {HomeComponent} from './searchMusic/home/home.component';
import {HeaderComponent} from './searchMusic/header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {ArtistComponent} from './searchMusic/artist/artist.component';
import {ArtistTrackListComponent} from './searchMusic/artist/artist-track-list/artist-track-list.component';
import {ArtistAlbumListComponent} from './searchMusic/artist/artist-album-list/artist-album-list.component';
import {AlwaysAuthGuard} from './searchMusic/guards/always-auth.guard';
import {UserAuthService} from './searchMusic/services/user-auth.service';
import {OnlyLoggedInUsersGuard} from './searchMusic/guards/only-logged-in-users.guard';
import {AlwaysAuthChildrenGuard} from './searchMusic/guards/always-auth-children.guard';
import {UnsearchedTermGuard} from './searchMusic/guards/unsearched-term.guard';
import { ArtistVideoListComponent } from './searchMusic/artist/artist-video-list/artist-video-list.component';

// define routes for searchMusic application
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'find', redirectTo: 'search'},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchMusicComponent,
    // canDeactivate: [UnsearchedTermGuard]
  },
  {
    path: 'artist/:artistId',
    component: ArtistComponent,
    canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard],
    canActivateChild: [AlwaysAuthChildrenGuard],
    children: [
      {path: '', redirectTo: 'tracks', pathMatch: 'full'},
      {path: 'tracks', component: ArtistTrackListComponent},
      {path: 'albums', component: ArtistAlbumListComponent},
      {path: 'videos', component: ArtistVideoListComponent}
    ]
  },
  {path: '**', component: HomeComponent}
];

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
    SearchComponent,
    SearchMusicComponent,
    HomeComponent,
    HeaderComponent,
    ArtistComponent,
    ArtistTrackListComponent,
    ArtistAlbumListComponent,
    ArtistVideoListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [SimpleService, SearchService, SearchMusicService, AlwaysAuthGuard,
    UserAuthService, OnlyLoggedInUsersGuard, AlwaysAuthChildrenGuard,
    UnsearchedTermGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
