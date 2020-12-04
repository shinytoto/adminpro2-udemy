import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

// Services
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

// Models
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(
    private _usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.formBuilder.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this._usuarioService.actualizarUsuario(this.perfilForm.value).subscribe(
      (response: any) => {
        const { nombre, email } = response.usuario;

        this.usuario.nombre = nombre;
        this.usuario.email = email;
      },
      (error) => {
        Swal.fire('Error', error.error.mensaje, 'error');
      }
    );
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    // Previsualizar imagen al cargar
    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuario', this.usuario._id)
      .then(
        (img) => {
          this.usuario.img = img;
          Swal.fire(
            'Imagen subida correctamente',
            'Se ha actualizado tu imagen de perfil.',
            'success'
          );
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Error al subir la imagen.', 'error');
        }
      );
  }
}
