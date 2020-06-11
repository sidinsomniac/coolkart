import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { CipherService } from '../cipher.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AngularFireAuth, private cipher: CipherService) { }

  loginWithGoogle() {
    this.authService.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  signIn(email, password) {
    event.preventDefault();
    // const myCipher = this.cipher.encrypt('mySecretSalt')('hello world');
    // const decipher = this.cipher.decrypt('mySecretSalt')(myCipher);

    console.dir(email.validity.valid);
    // this.authService.auth.createUserWithEmailAndPassword(email.value)

  }

}
