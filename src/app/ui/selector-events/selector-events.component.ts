import { Component, Input } from '@angular/core';
import { IEvent } from '@data/models/event';

@Component({
  selector: 'ui-selector-events',
  templateUrl: './selector-events.component.html',
  styleUrls: ['./selector-events.component.scss']
})
export class SelectorEventsComponent {

  @Input()
  events: IEvent[] | null;
}


