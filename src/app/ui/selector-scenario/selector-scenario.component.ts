import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ScenarioListItem } from 'src/app/data/models/scenario-list-item';

@Component({
  selector: 'ui-selector-scenario',
  templateUrl: './selector-scenario.component.html',
  styleUrls: ['./selector-scenario.component.scss'],
})
export class SelectorScenarioComponent {
  @Input()
  scenarios: ScenarioListItem[] | null;

  @Output()
  selectedScenarioId = new EventEmitter<number>();
}
