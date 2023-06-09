import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapContainer } from './map.component';

describe('MapComponent', () => {
  let component: MapContainer;
  let fixture: ComponentFixture<MapContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapContainer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
