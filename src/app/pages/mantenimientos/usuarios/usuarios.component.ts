import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

// Services
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedaService } from '../../../services/busqueda.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

// Models
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde = 0;
  public cargando = true;

  public imgSubs: Subscription;

  constructor(
    private _usuarioService: UsuarioService,
    private _busquedaService: BusquedaService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(850))
      .subscribe(() => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ totalRegistros, usuarios }) => {
        this.totalUsuarios = totalRegistros;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }
    this.cargando = true;

    this._busquedaService
      .busqueda('usuario', termino)
      .subscribe((resultadoBusqueda: Usuario[]) => {
        this.cargando = false;
        this.usuarios = resultadoBusqueda;
      });
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuarioId) {
      return Swal.fire('Error', 'No puedes borrarte a ti mismo.', 'error');
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas a punto de borrar a ${usuario.nombre}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.value) {
        this._usuarioService.eliminarUsuario(usuario).subscribe(
          () => {
            this.cargarUsuarios();

            Swal.fire(
              'Borrado!',
              'El usuario ha sido borrado con exito!',
              'success'
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this._usuarioService.guardarUsuario(usuario).subscribe(
      () => {},
      (error) => {
        Swal.fire('Error', 'No se ha cambiado el rol de usuario', 'error');
      }
    );
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuario', usuario._id, usuario.img);
  }
}
