import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      switchMap(user => this.userService.getUser(user.uid).valueChanges())
    ).pipe(
      map(appUser => appUser.isAdmin)
    )
  }
}
