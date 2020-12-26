import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this._usuarioService.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false
    }
  }
}
