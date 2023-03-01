import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorScenarioComponent } from './selector-scenario/selector-scenario.component';
import { DetailsScenarioComponent } from './details-scenario/details-scenario.component';



@NgModule({
  declarations: [
    SelectorScenarioComponent,
    DetailsScenarioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectorScenarioComponent,
    DetailsScenarioComponent
  ]
})
export class UiModule { }
