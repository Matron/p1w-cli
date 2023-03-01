import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Scenario } from 'src/app/data/models/scenario';

@Component({
  selector: 'ui-details-scenario',
  templateUrl: './details-scenario.component.html',
  styleUrls: ['./details-scenario.component.scss']
})
export class DetailsScenarioComponent {
@Input()
scenario: Scenario | undefined;

}
