import { Component, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnChanges {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  @Input() tooltip: string;
  @Input() hostPosition: {[index: string]: number};

  ngOnChanges(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'top', this.hostPosition.top + 'px' );
    this.renderer.setStyle(this.elRef.nativeElement, 'left', this.hostPosition.right + 'px');
  }

}
