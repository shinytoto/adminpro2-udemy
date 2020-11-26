import { Component } from '@angular/core';

// Services
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private _usuarioService: UsuarioService) {}

  logout() {
    this._usuarioService.logout();
  }
}
