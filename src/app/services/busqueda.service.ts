import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      (usuario) =>
        new Usuario(
          usuario.nombre,
          usuario.email,
          '',
          usuario.img,
          usuario.google,
          usuario.role,
          usuario._id
        )
    );
  }

  busqueda(tipo: 'usuario' | 'medico' | 'hospital', termino: string) {
    return this.http
      .get<any[]>(`${base_url}/busqueda/${tipo}/${termino}`, this.headers)
      .pipe(
        map((response: any) => {
          switch (tipo) {
            case 'usuario':
              return this.transformarUsuarios(response.resultados);

            default:
              return [];
          }
        })
      );
  }
}
