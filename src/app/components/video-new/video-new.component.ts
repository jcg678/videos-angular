import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Video} from '../../models/video';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [UserService]
})
export class VideoNewComponent implements OnInit {
  public page_title:string;
  public identity;
  public token;
  public video: Video;

  constructor(private _userService: UserService,
              private _router: Router,
              private _route: ActivatedRoute
  ) {
    this.page_title = 'Nuevo video';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.video = new Video(1,this.identity.sub,'','','','',null,null);
  }


}
