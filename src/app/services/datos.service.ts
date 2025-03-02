import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private domicilio: any = {}; // Variable para almacenar el domicilio

  constructor() { }

  // Método para guardar el domicilio
  setDomicilio(domicilio: any) {
    this.domicilio = domicilio; // Guardamos el domicilio recibido
  }

  // Método para obtener el domicilio
  getDomicilio() {
    return this.domicilio; // Retornamos el domicilio almacenado
  }
}
