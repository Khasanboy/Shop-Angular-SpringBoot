import { AuthService } from '@membership/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
    if (this.authService.getToken()) {
      this.authService.getCurrentUser().subscribe(
        data => {},
        error => {console.log(error); }
      );
    }
  }

  ngOnInit() {

  }
}
