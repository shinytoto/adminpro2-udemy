import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {
    //   if (true) {
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salio mal');
    //   }
    // });
    // promesa
    //   .then((mensaje) => {
    //     console.log(mensaje);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // console.log('Fin del Init');

    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });
  }

  getUsuarios() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users?page=2').then((response) => {
        response.json().then((body) => {
          resolve(body.data);
          reject('Error que nunca sucedera...');
        });
      });
    });
  }
}
