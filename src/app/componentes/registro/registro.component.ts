import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { loginServicer } from "src/app/servicios/login.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  //atributos
  email: string;
  password: string;

  constructor(
    private router: Router,
    private mensajesFlash: FlashMessagesService,
    private loginService: loginServicer
  ) {}

  ngOnInit(): void {
    this.loginService.getUserAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(["/"]);
      }
    });
  }

  registro() {
    this.loginService
      .registrarse(this.email, this.password)
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
