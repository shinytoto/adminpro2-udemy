import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

import Swal from 'sweetalert2';

declare const gapi: any;

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interace';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

// Models
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get usuarioId(): string {
    return this.usuario._id || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuario`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  actualizarUsuario(usuario: { nombre: string; email: string; role: string }) {
    // Validación que no permite cambiar el rol de usuario
    usuario = {
      ...usuario,
      role: this.usuario.role,
    };

    return this.http
      .put(`${base_url}/usuario/${this.usuarioId}`, usuario, this.headers)
      .pipe(
        map((response) => {
          Swal.fire(
            'Usuario Actualizado',
            'Los datos se han actualizado correctamente.',
            'success'
          );
          return response;
        })
      );
  }

  cargarUsuarios(desde: number) {
    return this.http
      .get<CargarUsuario>(`${base_url}/usuario?desde=${desde}`, this.headers)
      .pipe(
        map((response) => {
          const usuarios = response.usuarios.map(
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
          return {
            totalRegistros: response.totalRegistros,
            usuarios,
          };
        })
      );
  }

  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/auth`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  validarToken(): Observable<boolean> {
    // const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/auth/renovar`, this.headers).pipe(
      map((response: any) => {
        // Creación de instancia con los datos que nos llegan
        const {
          email,
          google,
          nombre,
          role,
          img = '',
          _id,
        } = response.usuarioDB;
        this.usuario = new Usuario(nombre, email, '', img, google, role, _id);

        localStorage.setItem('token', response.token);
        return true;
      }),
      catchError((error) => of(false)) // Devolver Observable con el valor de FALSE
    );
  }

  // ? Google

  loginGoogle(token) {
    return this.http.post(`${base_url}/auth/google`, { token }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '209584600484-qgiahfev0ijbc0gpshj0lv511laiu4h5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete(`${base_url}/usuario/${usuario._id}`, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${base_url}/usuario/${usuario._id}`,
      usuario,
      this.headers
    );
  }
}
