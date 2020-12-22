import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

// Models
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  public Medico: Medico;

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  crearMedico(medico: { nombre: string; hospital: string }) {
    return this.http.post(`${base_url}/medico`, medico, this.headers).pipe(
      map((nuevoMedico: { ok: boolean; medico: Medico }) => {
        return nuevoMedico.medico;
      })
    );
  }

  obtenerMedico(id: string) {
    return this.http
      .get(`${base_url}/medico/${id}`, this.headers)
      .pipe(
        map((response: { ok: boolean; medico: Medico }) => response.medico)
      );
  }
  cargarMedicos(desde: number) {
    return this.http
      .get(`${base_url}/medico?desde=${desde}`, this.headers)
      .pipe(
        map(
          (response: {
            ok: boolean;
            medicos: Medico[];
            totalRegistros: number;
          }) => {
            return {
              medicos: response.medicos,
              totalRegistros: response.totalRegistros,
            };
          }
        )
      );
  }

  actualizarMedico(medico: Medico) {
    return this.http.put(
      `${base_url}/medico/${medico._id}`,
      medico,
      this.headers
    );
  }

  eliminarMedico(id: string) {
    return this.http.delete(`${base_url}/medico/${id}`, this.headers);
  }
}
