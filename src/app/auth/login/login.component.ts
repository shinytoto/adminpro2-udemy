import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

declare const gapi: any;

// Services
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public auth2: any;
  public loginForm = this.formBuilder.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [localStorage.getItem('remember') || ''],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this._usuarioService.loginUsuario(this.loginForm.value).subscribe(
      (response) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem('remember', this.loginForm.get('remember').value);
          this.router.navigateByUrl('/dashboard');
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }
        this.router.navigateByUrl('/');
      },
      (error) => {
        {
          Swal.fire('Error', error.error.mensaje, 'error');
        }
      }
    );
  }

  // ? Google SignIn

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  async startApp() {

    await this._usuarioService.googleInit();
    this.auth2 = this._usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},  (googleUser) => {
      const id_token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(id_token).subscribe((response) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      });
    },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
