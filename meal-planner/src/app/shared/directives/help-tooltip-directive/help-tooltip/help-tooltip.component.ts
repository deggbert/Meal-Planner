import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-help-tooltip',
  templateUrl: './help-tooltip.component.html',
  styleUrls: ['./help-tooltip.component.css']
})
export class HelpTooltipComponent {
  @Input() tooltip: string;

  isTooltip: boolean = false;
  count: number = 0

  showTooltip(): void {  
    this.isTooltip = true;
  }

  hideTooltip(): void {
    this.isTooltip = false;
  }
}
