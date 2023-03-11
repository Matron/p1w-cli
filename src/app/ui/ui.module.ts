import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorScenarioComponent } from './selector-scenario/selector-scenario.component';
import { DetailsScenarioComponent } from './details-scenario/details-scenario.component';
import { SelectorEventsComponent } from './selector-events/selector-events.component';

@NgModule({
  declarations: [
    DetailsScenarioComponent,
    SelectorEventsComponent,
    SelectorScenarioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DetailsScenarioComponent,
    SelectorEventsComponent,
    SelectorScenarioComponent
  ]
})
export class UiModule { }
