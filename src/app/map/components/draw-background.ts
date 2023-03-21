import { IComponent } from '@ecs/models/component';
import { MapBackground } from '@map/entities/map-background';
import { Graphics } from '@map/services/graphics';

export class DrawBackgroundComponent implements IComponent {
  public entity: MapBackground;

  private _image: HTMLImageElement = new Image();

  constructor(private _backgroundImage: string) {}

  public awake(): void {
    this._image.src = this._backgroundImage
    this._image.addEventListener('load', () => {
      this._clear();
    });
  }
  
  public update(deltaTime: number): void {
    this._clear();
    this._draw();
  }

  private _clear(): void {
    Graphics.clearCanvas();
  }

  private _draw(): void { 
    Graphics.drawImage(this._image, this.entity!.getBackgroundPosition());
  }
}
