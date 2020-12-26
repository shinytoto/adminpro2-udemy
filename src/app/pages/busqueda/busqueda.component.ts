import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { BusquedaService } from '../../services/busqueda.service';

// Models
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[];
  public medicos: Medico[];
  public hospitales: Hospital[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _busquedaService: BusquedaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) =>
      this.busquedaGlobal(termino)
    );
  }

  busquedaGlobal(termino: string) {
    this._busquedaService
      .busquedaGlobal(termino)
      .subscribe(({ usuarios, medicos, hospitales }) => {
        this.usuarios = usuarios;
        this.medicos = medicos;
        this.hospitales = hospitales;
      });
  }

  abrirMedico(medico: Medico) {
    this.router.navigateByUrl(`/dashboard/medico/${medico._id}`);
  }
}
