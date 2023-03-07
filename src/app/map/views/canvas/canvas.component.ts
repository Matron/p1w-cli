import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Graphics } from '@map/services/graphics.service';

@Component({
  selector: 'map-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  // TODO: do we need this here?
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.canvas.nativeElement.width = window.innerWidth - 6;
    this.canvas.nativeElement.height = window.innerHeight - 180;
  }

  ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      Graphics.setContext(context);
    }
    this.onResize();
  }
}
