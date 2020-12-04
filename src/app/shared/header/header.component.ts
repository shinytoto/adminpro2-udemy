import { Component } from '@angular/core';

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

  constructor(private _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  logout() {
    this._usuarioService.logout();
  }
}
