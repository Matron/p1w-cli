import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorScenarioComponent } from './selector-scenario.component';

describe('SelectorScenarioComponent', () => {
  let component: SelectorScenarioComponent;
  let fixture: ComponentFixture<SelectorScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorScenarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
