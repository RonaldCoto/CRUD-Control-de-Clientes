import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Configuracion } from "../modelo/configuracion.model";

@Injectable()
export class configuracionServicio{
    configuracionDoc: AngularFirestoreDocument<Configuracion>;
    configuracion :Observable<Configuracion>;

    //id unico de la colección de configfuracion
    id = '1';

    constructor(private db: AngularFirestore){}

    getConfiguración(): Observable<Configuracion> {
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracion = this.configuracionDoc.valueChanges();
        return this.configuracion;
    }

    modificarConfiguracion(configuracion: Configuracion){
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracionDoc.update(configuracion);
    }

}