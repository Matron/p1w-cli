import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './views/canvas/canvas.component';
import { MapComponent } from './views/map/map.component';

@NgModule({
  declarations: [
    MapComponent,
    CanvasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
