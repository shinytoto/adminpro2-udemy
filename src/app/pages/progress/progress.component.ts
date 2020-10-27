import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  BarraProgreso1 = 50;
  BarraProgreso2 = 50;

  get getBarraProgreso1() {
    return `${this.BarraProgreso1}%`;
  }

  get getBarraProgreso2() {
    return `${this.BarraProgreso2}%`;
  }
}
