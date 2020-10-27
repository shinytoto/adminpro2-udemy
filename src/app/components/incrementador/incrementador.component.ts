import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @Input() valorIncrementador = 50;
  @Input() btnClass = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number) {
    if (this.valorIncrementador >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return (this.valorIncrementador = 100);
    }

    if (this.valorIncrementador <= 0 && valor <= 0) {
      this.valorSalida.emit(0);
      return (this.valorIncrementador = 0);
    }

    this.valorIncrementador = this.valorIncrementador + valor;
    this.valorSalida.emit(this.valorIncrementador);
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.valorIncrementador = 100;
    } else if (nuevoValor <= 0) {
      this.valorIncrementador = 0;
    } else {
      this.valorIncrementador = nuevoValor;
    }
    this.valorSalida.emit(this.valorIncrementador);
  }
}
