export interface Cliente {
  //el signo de ? es para que el atributo sea opcional, no obligatorio
  id?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  saldo?: number;
}
