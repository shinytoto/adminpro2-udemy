import { Injectable, EventEmitter } from '@angular/core';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal = true;
  public tipo: 'usuario' | 'hospital' | 'medico';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuario' | 'medico' | 'hospital',
    id: string,
    img: string = 'no-img.jpg'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // this.img = img;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
