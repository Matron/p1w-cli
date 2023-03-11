import { TestBed } from '@angular/core/testing';

import { Graphics } from './graphics';

describe('GraphicsService', () => {
  let service: Graphics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Graphics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
