import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';


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

  constructor(private _userService: UserService,
              private _videoService: VideoService) {
    this.page_title = 'Mis videos';
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.getVideos();
  }

  getVideos(){
    this._videoService.getVideos(this.token).subscribe(
      response => {
        if (response.status == 'success') {
          this.videos = response.videos;
          console.log(response.videos);
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
