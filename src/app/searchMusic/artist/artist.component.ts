import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchMusicService} from '../services/search-music.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private _itunes: SearchMusicService) {
    this.route.params.subscribe(params => this._itunes.searchArtist(params['artistId']).then());
  }

  get itunes() {
    return this._itunes;
  }

  ngOnInit() {
  }

}
