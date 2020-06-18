import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userService.saveUser(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(returnUrl);
        }
      }
    })
  }
}
