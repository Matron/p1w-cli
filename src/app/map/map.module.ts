import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './views/canvas/canvas.component';
import { MapContainer } from './views/map/map.component';

@NgModule({
  declarations: [
    MapContainer,
    CanvasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapContainer
  ]
})
export class MapModule { }
