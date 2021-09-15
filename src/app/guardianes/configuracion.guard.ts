import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { configuracionServicio } from "../servicios/configuracion.service";

@Injectable()
export class configuracionGuard implements CanActivate {
  constructor(
    private router: Router,
    private configuracionService: configuracionServicio
  ) {}

  canActivate(): Observable<boolean> {
    return this.configuracionService.getConfiguración().pipe(
      map((config) => {
        if (config.permitirRegistro) {
          return true;
        } else {
          this.router.navigate(["/login"]);
          return false;
        }
      })
    );
  }
}
