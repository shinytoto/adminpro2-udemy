import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
})
export class DonaComponent {
  @Input() title = 'Sin título';
  @Input() labels: Label[] = ['Label1', 'Label2', 'Label3'];
  @Input() data: MultiDataSet = [[100, 200, 300]];

  public colors: Color[] = [
    { backgroundColor: ['#6857B3', '#009FEE', '#F031B4'] },
  ];
}
