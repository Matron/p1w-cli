import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorLayersComponent } from './selector-layers.component';

describe('SelectorLayersComponent', () => {
  let component: SelectorLayersComponent;
  let fixture: ComponentFixture<SelectorLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorLayersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
