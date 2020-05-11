import {Component, OnInit, DoCheck} from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'videos-angular';
  public idendity;
  public token;

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
  }

  loadUser() {
    this.idendity = this._userService.getIdentity();
    //console.log(this.idendity);
    this.token = this._userService.getToken();
    //console.log(this.token);
  }

  ngDoCheck(): void {
    this.loadUser();
  }
}
