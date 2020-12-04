import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

declare const gapi: any;

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interace';

// Models
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';

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

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuario`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  actualizarUsuario(usuario: { nombre: string; email: string; role: string }) {
    usuario = {
      ...usuario,
      role: this.usuario.role,
    };

    return this.http
      .put(`${base_url}/usuario/${this.usuarioId}`, usuario, {
        headers: { 'x-token': this.token },
      })
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

  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/auth`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  validarToken(): Observable<boolean> {
    // const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${base_url}/auth/renovar`, {
        headers: { 'x-token': this.token },
      })
      .pipe(
        map((response: any) => {
          // Creación de instancia con los datos que nos llegan
          const { email, google, nombre, role, img = '', _id } = response.usuarioDB;
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
    return new Promise((resolve) => {
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
}
