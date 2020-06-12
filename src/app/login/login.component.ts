import { Component } from '@angular/core';
import { CipherService } from '../cipher.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private cipher: CipherService) { }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  signIn(email, password) {
    event.preventDefault();
    // const myCipher = this.cipher.encrypt('mySecretSalt')('hello world');
    // const decipher = this.cipher.decrypt('mySecretSalt')(myCipher);

    console.dir(email.validity.valid);
    // this.authService.auth.createUserWithEmailAndPassword(email.value)

  }

}
