import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IScenarioListItem } from '@data/models/scenario-list-item';

@Component({
  selector: 'ui-selector-scenario',
  templateUrl: './selector-scenario.component.html',
  styleUrls: ['./selector-scenario.component.scss'],
})
export class SelectorScenarioComponent {
  @Input()
  scenarios: IScenarioListItem[] | null;

  @Output()
  selectedScenarioId = new EventEmitter<number>();
}
