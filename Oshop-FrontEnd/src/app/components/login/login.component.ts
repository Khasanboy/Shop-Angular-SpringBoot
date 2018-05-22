import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  login() {
    
    const body = { email: this.email, password: this.password };

    this.authService.login(body).subscribe(
      data => {
        this.authService.saveToken(data['accessToken'], data['tokenType']);
        this.authService.getCurrentUser();     
        this.router.navigate(["/"]);
        this.flashMessages.show("Logged in successfull", { cssClass: 'alert-success text-center', timeout: 2000 });
      },
      error => {
        console.log(error);
        this.flashMessages.show("Log in unsuccessfull. Please try again", { cssClass: 'alert-danger text-center', timeout: 2000 });
      }
    )

  }

}
