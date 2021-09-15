import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

@Injectable()
export class loginServicer {
  constructor(private authService: AngularFireAuth) {}

  login(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, pass).then(
        (datos) => resolve(datos),
        (error) => reject(error)
      );
    });
  }

  getUserAuth() {
    return this.authService.authState.pipe(
      map((auth) => {
        return auth;
      })
    );
  }

  logOut(){
    this.authService.signOut();
  }

  registrarse(email: string, pass: string){
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, pass).then(
        (datos) => resolve(datos),
        (error) => reject(error)
      );
    });
  }
}
