import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";
import { Cliente } from "src/app/modelo/cliente.model";
import { ClienteServicio } from "src/app/servicios/cliente.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"],
})
export class ClientesComponent implements OnInit {
  //declaraciones
  clientes: Cliente[];
  cliente: Cliente = {
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0,
  };
  
  //referencias del html
  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botoncerrar") botoncerrar: ElementRef;

  constructor(
    private clienteServicio: ClienteServicio,
    private flashMensaje: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.clienteServicio.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes != null) {
      this.clientes.forEach((element) => {
        saldoTotal += element.saldo;
      });
    }
    return saldoTotal;
  }

  agregar({ value, valid }: { value: Cliente; valid: boolean }) {
    if (!valid) {
      this.flashMensaje.show("Por favor llena el formulario correctamente", {
        cssClass: "alert-danger",
        timeout: 4000,
      });
    }else{
      //agregar el nuevo cliente
      this.clienteServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botoncerrar.nativeElement.click();
  }
}
