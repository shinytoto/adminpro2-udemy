import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
})
export class Grafica1Component {
  public labels1: string[] = [
    'Download Sales1',
    'In-Store Sales1',
    'Mail-Order Sales1',
  ];
  public labels2: string[] = [
    'Download Sales2',
    'In-Store Sales2',
    'Mail-Order Sales3',
  ];
  public labels3: string[] = [
    'Download Sales3',
    'In-Store Sales3',
    'Mail-Order Sales3',
  ];
  public labels4: string[] = [
    'Download Sales4',
    'In-Store Sales4',
    'Mail-Order Sales4',
  ];

  public data1 = [[111, 111, 111]];
  public data2 = [[400, 700, 1200]];
  public data3 = [[333, 333, 333]];
  public data4 = [[444, 444, 444]];
}
