import { Vector2d } from '@map/models/vector-2d';
import { MapObject } from './map-object';
import { MapContainer } from '@map/views/map/map.component';
import { TestBed } from '@angular/core/testing';
import { NgZone } from '@angular/core';

describe('MapObject', () => {
  it('should create an instance', () => {
    const ngZone = TestBed.inject(NgZone);
    const position = new Vector2d(0,0);
    const map = new MapContainer(ngZone);
    const mapObject = new MapObject(position, map);
    expect(mapObject).toBeTruthy();
  });
});
