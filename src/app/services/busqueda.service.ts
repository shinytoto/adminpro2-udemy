import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

// Models
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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

  private transformarHospitales(resultados: any[]): Hospital[] {
    return resultados;
  }

  private transformarMedicos(resultados: any[]): Medico[] {
    return resultados;
  }

  busqueda(tipo: 'usuario' | 'medico' | 'hospital', termino: string) {
    return this.http
      .get<any[]>(`${base_url}/busqueda/${tipo}/${termino}`, this.headers)
      .pipe(
        map((response: any) => {
          switch (tipo) {
            case 'usuario':
              return this.transformarUsuarios(response.resultados);

            case 'hospital':
              return this.transformarHospitales(response.resultados);

            case 'medico':
              return this.transformarMedicos(response.resultados);

            default:
              return [];
          }
        })
      );
  }
}
