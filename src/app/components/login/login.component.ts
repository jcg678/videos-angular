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
    this.logout();
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        this.status = 'error';

        if (!response.status || response.status != 'error') {
          //this.status = 'success';
          this.identity = response;
          //token
          console.log(this.identity);
          this._userService.signup(this.user, true).subscribe(
            response => {

              if (!response.status || response.status != 'error') {

                this.token = response;
                console.log(this.token);
                this.status = 'success';
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                this._router.navigate(['/inicio']);
              }
            },
            error => {
              this.status = 'error';
              console.log('error');
            }
          );


          //console.log(this.identity);
        }
      },
      error => {
        this.status = 'error';
        console.log('error');
      }
    );
  }

  logout(){
    this._route.params.subscribe(params => {
      let sure = +params['sure'];
      if(sure === 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['/inicio']);
      }

    });
  }


}
