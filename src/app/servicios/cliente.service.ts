import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Cliente } from "../modelo/cliente.model";
import { map } from "rxjs/operators";
import { dashCaseToCamelCase } from "@angular/compiler/src/util";

@Injectable()
export class ClienteServicio {
  //Ambos objetos retornan colecciones, por lo que hay que suscribirse
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;

  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection("clientes", (ref) =>
      ref.orderBy("nombre", "asc")
    ); //dentro de collection va el nombre de la coleccion definida en cloudfirestore
  }

  getClientes(): Observable<Cliente[]> {
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    this.clientesColeccion.add(cliente);
  }

  getCliente(id: string) {
    //obtener cliente por su id
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`); //clientes es el nombre de coleccion en firestore

    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const dato = accion.payload.data() as Cliente;
          dato.id = accion.payload.id;
          return dato;
        }
      })
    );
    return this.cliente;
  }

  modificar(cliente:Cliente){
    this.clienteDoc=this.db.doc<Cliente>(`clientes/${cliente.id}`);//clientes es el nombre de coleccion en firestore
    this.clienteDoc.update(cliente);//modifica con los valores recibidos en el parametro cliente
  }

  eliminar(cliente:Cliente){
    this.clienteDoc=this.db.doc<Cliente>(`clientes/${cliente.id}`);//clientes es el nombre de coleccion en firestore
    this.clienteDoc.delete();
  }
}
