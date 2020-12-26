import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

// Services
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmit = false;

  public registerForm = this.formBuilder.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terminos: [false, [Validators.required, Validators.requiredTrue]],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _usuarioService: UsuarioService
  ) {}

  crearUsuario() {
    this.formSubmit = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      // Realizar el posteo
      this._usuarioService.crearUsuario(this.registerForm.value).subscribe(
        () => this.router.navigateByUrl('/'),
        (error) => Swal.fire('Error', error.error.mensaje, 'error')
      );
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmit) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.formSubmit) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmit;
  }

  passwordsIguales(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(password1);
      const pass2Control = formGroup.get(password2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
