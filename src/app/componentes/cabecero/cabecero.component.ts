import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { configuracionServicio } from "src/app/servicios/configuracion.service";
import { loginServicer } from "src/app/servicios/login.service";

@Component({
  selector: "app-cabecero",
  templateUrl: "./cabecero.component.html",
  styleUrls: ["./cabecero.component.css"],
})
export class CabeceroComponent implements OnInit {
  //var de sesion
  isLogoggedIn: boolean;
  loggedInUser: string;

  permitirRegistro: boolean;

  constructor(
    private loginService: loginServicer,
    private router: Router,
    private configurarServicio: configuracionServicio
  ) {}

  ngOnInit(): void {
    this.loginService.getUserAuth().subscribe((auth) => {
      if (auth) {
        this.isLogoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLogoggedIn = false;
      }
    });

    this.configurarServicio.getConfiguración().subscribe((configuracion) => {
      this.permitirRegistro = configuracion.permitirRegistro;
    });
  }

  cerrarSesion() {
    this.loginService.logOut();
    this.isLogoggedIn = false;
    this.router.navigate(["/login"]);
  }
}
