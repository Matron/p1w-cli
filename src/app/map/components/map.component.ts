import { AfterViewInit, Component } from '@angular/core';
import { Entity } from '@ecs/models/entity';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends Entity implements AfterViewInit {

  constructor() {
    super();
    console.log('new map'); 
  }
  
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  
  public entities: Entity[] = [];

  private _lastTimeStamp = 0;

  public override awake(): void {
      super.awake();

      for (const entity of this.entities) {
        entity.awake();
      }

      window.requestAnimationFrame(() => {
        console.log('start animation loop');
        
        this._lastTimeStamp = Date.now();
        this.update();
      })
  }

  public override update(): void {
      const deltaTime = (Date.now() - this._lastTimeStamp) / 1000;
      
      super.update(deltaTime);

      for (const entity of this.entities) {
        entity.update(deltaTime);
      }
      
      this._lastTimeStamp = Date.now();
      window.requestAnimationFrame(() => this.update());
  }
}
