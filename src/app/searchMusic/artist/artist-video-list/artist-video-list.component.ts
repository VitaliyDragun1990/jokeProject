import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchMusicService} from '../../services/search-music.service';

@Component({
  selector: 'app-artist-video-list',
  templateUrl: './artist-video-list.component.html',
  styleUrls: ['./artist-video-list.component.css']
})
export class ArtistVideoListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private _itunes: SearchMusicService) {
    this.route.parent.params.subscribe(params => {
      this._itunes.searchVideos(params['artistId']).then();
    });
  }

  ngOnInit() {
  }

  get itunes() {
    return this._itunes;
  }

}
