import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(private router: Router) {}

  public menu = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

    if (this.menu.length === 0) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //       { titulo: 'Gráficas', url: 'grafica1' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'RXJS', url: 'rxjs' },
  //     ],
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Médicos', url: 'medicos' },
  //     ],
  //   },
  // ];
}
