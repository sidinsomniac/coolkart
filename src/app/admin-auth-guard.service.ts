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
    return this.authService.appUser$.pipe(
      map(user => user.isAdmin)
    )
  }
}
