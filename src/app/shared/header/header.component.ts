import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UsuarioService } from '../../services/usuario.service';

// Models
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public usuario: Usuario;

  constructor(private _usuarioService: UsuarioService, private router: Router) {
    this.usuario = this._usuarioService.usuario;
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/busqueda/${termino}`);
  }

  logout() {
    this._usuarioService.logout();
  }
}
