import { Component, OnInit } from '@angular/core';

// Services
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

// Models
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public usuario: Usuario;

  constructor(
    private sidebarService: SidebarService,
    public _usuarioService: UsuarioService
  ) {
    this.menuItems = this.sidebarService.menu;
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {}

  logout() {
    this._usuarioService.logout();
  }
}
