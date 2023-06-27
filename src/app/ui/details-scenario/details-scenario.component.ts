import { Component, Input } from '@angular/core';
import { IScenarioData } from '@data/models/scenario';

@Component({
  selector: 'ui-details-scenario',
  templateUrl: './details-scenario.component.html',
  styleUrls: ['./details-scenario.component.scss']
})
export class DetailsScenarioComponent {
@Input()
scenario: IScenarioData | undefined;

}
