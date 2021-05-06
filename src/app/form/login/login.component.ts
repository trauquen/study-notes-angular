import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = 'hunter';
  password?: string;
  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login = (): void => {
    if (this.username && this.password){
      this.auth.auth(this.username, this.password).subscribe(
        cert => {
        //  console.log(cert);
          if (cert){
            this.router.navigate(['heroes/1']);
          } else {
            console.log('error');
          }
        }
        );
      }
    }
  }
