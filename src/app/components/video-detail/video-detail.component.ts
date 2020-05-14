import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Video} from '../../models/video';
import {VideoService} from '../../services/video.service';


@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers: [UserService, VideoService]
})
export class VideoDetailComponent implements OnInit {
  public identity;
  public token;
  public status;
  public video: Video;

  constructor(private _userService: UserService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _videoService: VideoService
  ) {
    this.page_title = 'Editar video';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getVideo();
  }

  getVideo() {
    this._route.params.subscribe(
      params =>{
        const id = +params['id'];
        this._videoService.getVideo(this.token, id).subscribe(
          response => {
            if(response.status == 'success'){
              this.video = response.video;
            } else {
              this._router.navigate(['/inicio']);
            }
          },
          error => {
            console.log(error);
            this.status = 'error' ;
          }
        );
      });

  }

}
