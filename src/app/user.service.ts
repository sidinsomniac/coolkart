import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app'
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  saveUser(user:firebase.User) {
    this.db.object('/users/'+user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  getUser(uid:string):AngularFireObject<AppUser> {
    return this.db.object('/users/'+ uid);
  }
}
