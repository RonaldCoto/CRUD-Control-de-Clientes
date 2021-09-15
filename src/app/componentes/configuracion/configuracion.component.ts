import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/modelo/configuracion.model';
import { configuracionServicio } from 'src/app/servicios/configuracion.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  
  permitirRegistro = false;
  constructor(private router:Router, private configuracionService:configuracionServicio) { }

  ngOnInit(): void {
    this.configuracionService.getConfiguración().subscribe( (config:Configuracion) => {
      this.permitirRegistro = config.permitirRegistro ;

    } )
  }
  
  guardar(){
    let configuracion = {permitirRegistro: this.permitirRegistro};
    this.configuracionService.modificarConfiguracion(configuracion);
    this.router.navigate(['/']);
  }

}
