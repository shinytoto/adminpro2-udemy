import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

// Services
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

// Models
import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _hospitalService: HospitalService,
    private _medicoService: MedicoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.obtenerMedico(id);
    });

    this.medicoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (hospital) => hospital._id === hospitalId
      );
    });
  }

  guardarMedico() {
    if (this.medicoSeleccionado) {
      // Actualizar datos
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };

      this._medicoService.actualizarMedico(data).subscribe(
        (medicoActualizado) => {
          Swal.fire(
            'Médico Actualizado!',
            'Los datos del médico han sido actualizados con exito!',
            'success'
          );
          console.log(medicoActualizado);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // Crear médico
      this._medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((nuevoMedico) => {
          Swal.fire(
            'Nuevo Médico Creado!',
            'El médico ha sido creado con exito!',
            'success'
          );
          this.router.navigateByUrl(`/dashboard/medico/${nuevoMedico._id}`);
        });
    }
  }

  obtenerMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this._medicoService
      .obtenerMedico(id)
      .pipe(delay(170))
      .subscribe(
        (medico) => {
          const {
            nombre,
            hospital: { _id },
          } = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({ nombre, hospital: _id });
        },
        (error) => {
          console.log(error);
          if (error.error.mensaje === 'Usuario no encontrado') {
            this.router.navigateByUrl(`/dashboard/medicos`);
          }
        }
      );
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((hospitales: any) => {
      this.hospitales = hospitales.hospitales;
    });
  }
}
