import { Directive, Input, HostListener, ViewContainerRef, ElementRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';

import { TooltipComponent } from './tooltip/tooltip.component'

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  constructor(
    private elRef: ElementRef,
    private vcRef: ViewContainerRef,
    private cfResolver: ComponentFactoryResolver,
  ) { }

  @Input('appTooltip') tooltip: string;

  toolTipCompRef: ComponentRef<TooltipComponent>;

  @HostListener('mouseenter') onMouseEnter() {
    if (this.tooltip) {
      this.showTooltip();
    }
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hideTooltip();
    }
  }

  showTooltip(): void {
    if (!this.toolTipCompRef) {
      let tooltipCompFactory = this.cfResolver.resolveComponentFactory(TooltipComponent);
      this.toolTipCompRef = this.vcRef.createComponent(tooltipCompFactory);
      this.toolTipCompRef.instance.tooltip = this.tooltip;
    } else {
      this.vcRef.insert(this.toolTipCompRef.hostView);
    }
    let hostPosition = this.elRef.nativeElement.getBoundingClientRect();
    this.toolTipCompRef.instance.hostPosition = hostPosition;
    this.toolTipCompRef.instance.ngOnChanges();
  }

  hideTooltip(): void {
    let index: number = this.vcRef.indexOf(this.toolTipCompRef.hostView);
    this.vcRef.detach(index);
  }

}
