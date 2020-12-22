import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  public Hospital: Hospital;

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  crearHospital(nombre: string) {
    return this.http.post(`${base_url}/hospital`, { nombre }, this.headers);
  }

  cargarHospitales(desde?: number) {

    if(desde || desde == 0){
      return this.http
      .get(`${base_url}/hospital?desde=${desde}`, this.headers)
      .pipe(
        map(
          (response: {
            ok: boolean;
            hospitales: Hospital[];
            totalRegistros: number;
          }) => {
            return {
              hospitales: response.hospitales,
              totalRegistros: response.totalRegistros,
            };
          }
        )
      );
    } else {
      return this.http
      .get(`${base_url}/hospital`, this.headers)
      .pipe(
        map(
          (response: {
            ok: boolean;
            hospitales: Hospital[];
            totalRegistros: number;
          }) => {
            return {
              hospitales: response.hospitales,
              totalRegistros: response.totalRegistros,
            };
          }
        )
      );
    }
  }

  actualizarHospital(id: string, nombre: string) {
    return this.http.put(
      `${base_url}/hospital/${id}`,
      { nombre },
      this.headers
    );
  }

  eliminarHospital(id: string) {
    return this.http.delete(`${base_url}/hospital/${id}`, this.headers);
  }
}
