import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, VideoService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public status;
  public videos;
  public page;
  public next_page;
  public prev_page;
  public number_pages;

  constructor(private _userService: UserService,
              private _videoService: VideoService,
              private _route: ActivatedRoute,
              private _router: Router
  ) {
    this.page_title = 'Mis videos';
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this._route.params.subscribe(params => {
      var page = +params['page'];

      if (!page) {
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }

      this.getVideos(page);
    });

  }

  getVideos(page){
    this._videoService.getVideos(this.token, page).subscribe(
      response => {
        if (response.status == 'success') {
          this.videos = response.videos;
          var number_pages = [];
          for (var i = 1; i <= response.total_pages ; i++){
            number_pages.push(i);
          }
          this.number_pages = number_pages;
          this.status = 'success';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

   getThumb(url, size) {
    let video;
    let results;
    let thumburl;

    if (url === null) {
      return '';
    }

    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    if (size != null) {
      thumburl = 'http://img.youtube.com/vi/' + video + '/' + size + '.jpg';
    } else {
      thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
    }

    return thumburl;
  }

}
