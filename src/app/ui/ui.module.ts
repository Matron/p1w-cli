import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsScenarioComponent } from './details-scenario/details-scenario.component';
import { FormsModule } from '@angular/forms';
import { GeneralFormComponent } from './general-form/general-form.component';
import { SelectorEventsComponent } from './selector-events/selector-events.component';
import { SelectorScenarioComponent } from './selector-scenario/selector-scenario.component';
import { SelectorLayersComponent } from './selector-layers/selector-layers.component';

@NgModule({
  declarations: [
    DetailsScenarioComponent,
    GeneralFormComponent,
    SelectorEventsComponent,
    SelectorLayersComponent,
    SelectorScenarioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DetailsScenarioComponent,
    GeneralFormComponent,
    SelectorEventsComponent,
    SelectorLayersComponent,
    SelectorScenarioComponent
  ]
})
export class UiModule { }
