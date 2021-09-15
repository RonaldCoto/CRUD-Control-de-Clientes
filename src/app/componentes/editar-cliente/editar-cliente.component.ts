import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Cliente } from "src/app/modelo/cliente.model";
import { ClienteServicio } from "src/app/servicios/cliente.service";

@Component({
  selector: "app-editar-cliente",
  templateUrl: "./editar-cliente.component.html",
  styleUrls: ["./editar-cliente.component.css"],
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = {
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0,
  };

  id: string;

  constructor(
    private clienteServicio: ClienteServicio,
    private flashMensaje: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.clienteServicio.getCliente(this.id).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  guardarModificacion({ value, valid }: { value: Cliente; valid: boolean }) {
    if (!valid) {
      this.flashMensaje.show("Por favor llena el formulario correctamente", {
        cssClass: "alert-danger",
        timeout: 4000,
      });
    } else {
      //modificar el cliente
      value.id = this.id;
      this.clienteServicio.modificar(value);
      this.router.navigate(['/']);
    }
  }

  eliminarCliente(){
    if(confirm("¿Serguro que desea eliminar el cliente?")){
      this.clienteServicio.eliminar(this.cliente);
      this.router.navigate(['/']);
    }
  }
}
