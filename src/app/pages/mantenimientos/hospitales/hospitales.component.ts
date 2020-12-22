import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

// Services
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedaService } from '../../../services/busqueda.service';

// Models
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public totalHospitales = 0;
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public desde = 0;
  public cargando = true;

  public imgSubs: Subscription;

  constructor(
    private _hospitalService: HospitalService,
    private _modalImagenService: ModalImagenService,
    private _busquedaService: BusquedaService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this._modalImagenService.nuevaImagen
      .pipe(delay(850))
      .subscribe(() => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService
      .cargarHospitales(this.desde)
      .subscribe(({ totalRegistros, hospitales }) => {
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
        this.totalHospitales = totalRegistros;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalHospitales) {
      this.desde -= valor;
    }

    this.cargarHospitales();
  }

  guardarCambios(hospital: Hospital) {
    this._hospitalService
      .actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(
        (response) => {
          Swal.fire(
            'Hospital Actualizado',
            'Los datos del hospital se han actualizado correctamente',
            'success'
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas a punto de borrar el ${hospital.nombre}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.value) {
        this._hospitalService.eliminarHospital(hospital._id).subscribe(
          () => {
            this.cargarHospitales();

            Swal.fire(
              'Borrado!',
              'El hospital ha sido borrado con exito!',
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

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this._hospitalService.crearHospital(value).subscribe(
        () => {
          this.cargarHospitales();

          Swal.fire(
            'Nuevo Hospital Creado!',
            'El hospital ha sido creado con exito!',
            'success'
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  abrirModal(hospital: Hospital) {
    this._modalImagenService.abrirModal('hospital', hospital._id, hospital.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.hospitales = this.hospitalesTemp);
    }
    this.cargando = true;

    this._busquedaService
      .busqueda('hospital', termino)
      .subscribe((resultadoBusqueda: Hospital[]) => {
        this.cargando = false;
        this.hospitales = resultadoBusqueda;
      });
  }
}
