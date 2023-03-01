import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IScenario } from '@data/models/scenario';

@Component({
  selector: 'ui-details-scenario',
  templateUrl: './details-scenario.component.html',
  styleUrls: ['./details-scenario.component.scss']
})
export class DetailsScenarioComponent {
@Input()
scenario: IScenario | undefined;

}
