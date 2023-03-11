import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorEventsComponent } from './selector-events.component';

describe('SelectorEventsComponent', () => {
  let component: SelectorEventsComponent;
  let fixture: ComponentFixture<SelectorEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
