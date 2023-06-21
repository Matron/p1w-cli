import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMapLayer } from '@data/models/map-layer';

@Component({
  selector: 'ui-selector-layers',
  templateUrl: './selector-layers.component.html',
  styleUrls: ['./selector-layers.component.scss']
})
export class SelectorLayersComponent {
  @Input()
  layers: IMapLayer[];

  @Output()
  selectedLayerId = new EventEmitter<number>();
}
