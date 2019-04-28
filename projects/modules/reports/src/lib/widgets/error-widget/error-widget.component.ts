import { Component, Input } from '@angular/core';

@Component({
  selector: 'vima-error-widget',
  templateUrl: './error-widget.component.html',
  styleUrls: ['./error-widget.component.scss']
})
export class ErrorWidgetComponent {

  // Error Type
  @Input() errorType: string;

  // Error Message
  @Input() errorMessage: string;

}
