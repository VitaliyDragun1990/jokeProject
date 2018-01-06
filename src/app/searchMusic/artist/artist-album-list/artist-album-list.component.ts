import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchMusicService} from '../../search-music.service';

@Component({
  selector: 'app-artist-album-list',
  templateUrl: './artist-album-list.component.html',
  styleUrls: ['./artist-album-list.component.css']
})
export class ArtistAlbumListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private _itunes: SearchMusicService) {
    this.route.parent.params.subscribe(params => {
      this._itunes.searchAlbums(params['artistId']).then();
    });
  }

  get itunes() {
    return this._itunes;
  }

  ngOnInit() {
  }

}
