import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchMusicService} from '../../services/search-music.service';

@Component({
  selector: 'app-artist-track-list',
  templateUrl: './artist-track-list.component.html',
  styleUrls: ['./artist-track-list.component.css']
})
export class ArtistTrackListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private _itunes: SearchMusicService) {
    this.route.parent.params.subscribe(params =>
      this._itunes.searchTracks(params['artistId']).then());
  }

  get itunes() {
    return this._itunes;
  }

  ngOnInit() {
  }

}
