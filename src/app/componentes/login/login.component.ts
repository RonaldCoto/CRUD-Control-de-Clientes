import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { timeout } from "rxjs/operators";
import { loginServicer } from "src/app/servicios/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  //atributos
  email: string;
  password: string;

  constructor(
    private router: Router,
    private mensajesFlash: FlashMessagesService,
    private loginService: loginServicer
  ) {}

  ngOnInit(): void {
    this.loginService.getUserAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  login() {
    this.loginService
      .login(this.email, this.password)
      .then((res) => {
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        this.mensajesFlash.show(error.message, {
          cssClass: "alert-danger",
          timeout: 4000,
        });
      });
  }
}
