import { TestBed } from '@angular/core/testing';

import { ClockService } from './clock.service';

describe('ClockService', () => {
  let service: ClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose the current time as an observable', () => {
    let currentTime: number | undefined;

    service.tick$.subscribe(time => {
      currentTime = time
    });

    expect(currentTime).toBeDefined();
    expect(typeof currentTime).toBe('number');
  })
});
