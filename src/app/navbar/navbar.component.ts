import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  public appUser: AppUser;

  constructor(private authService: AuthService ) {}

  ngOnInit() {
    this.authService.appUser$.subscribe(user => {
      this.appUser = user;
    })
  }

  logout() {
    this.authService.logout();
  }

}
