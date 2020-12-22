import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

// Services
import { MedicoService } from '../../../services/medico.service';
import { BusquedaService } from '../../../services/busqueda.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

// Models
import { Medico } from '../../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
})
export class MedicosComponent implements OnInit, OnDestroy {
  public totalMedicos = 0;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public desde = 0;
  public cargando = true;

  public imgSubs: Subscription;

  constructor(
    private _medicoService: MedicoService,
    private _busquedaService: BusquedaService,
    private _modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this._modalImagenService.nuevaImagen
      .pipe(delay(850))
      .subscribe(() => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;

    this._medicoService
      .cargarMedicos(this.desde)
      .subscribe(({ totalRegistros, medicos }) => {
        this.medicos = medicos;
        this.medicosTemp = medicos;
        this.totalMedicos = totalRegistros;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalMedicos) {
      this.desde -= valor;
    }

    this.cargarMedicos();
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas a punto de borrar el ${medico.nombre}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.value) {
        this._medicoService.eliminarMedico(medico._id).subscribe(
          () => {
            this.cargarMedicos();

            Swal.fire(
              'Borrado!',
              'El médico ha sido borrado con exito!',
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

  abrirModal(medico: Medico) {
    this._modalImagenService.abrirModal('medico', medico._id, medico.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.medicos = this.medicosTemp);
    }
    this.cargando = true;

    this._busquedaService
      .busqueda('medico', termino)
      .subscribe((resultadosBusqueda: Medico[]) => {
        this.cargando = false;
        this.medicos = resultadosBusqueda;
      });
  }
}
