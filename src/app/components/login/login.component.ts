import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token: string;
  public identity;

  constructor(private _userService: UserService,
              private _router: Router,
              private _route: ActivatedRoute
              ) {
    this.page_title = 'Login';
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        this.status = 'success';

        if (!response.status || response.status != 'error') {
          this.status = 'success';
          this.identity = response;
          //token
          this._userService.signup(this.user, true).subscribe(
            response => {
              this.status = 'success';
              if (!response.status || response.status != 'error') {

                this.token = response;
                console.log(this.token);

                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.user));

                this._router.navigate(['/inicio']);
              }
            },
            error => {
              this.status = 'error';
              console.log('error');
            }
          );


          console.log(this.identity);
        }
      },
      error => {
        this.status = 'error';
        console.log('error');
      }
    );
  }


}
