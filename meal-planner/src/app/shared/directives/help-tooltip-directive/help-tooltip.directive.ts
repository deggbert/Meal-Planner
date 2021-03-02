import { Directive, Input, ViewContainerRef, ComponentRef, ComponentFactoryResolver, TemplateRef, OnInit } from '@angular/core';

import { HelpTooltipComponent } from './help-tooltip/help-tooltip.component'

@Directive({
  selector: '[appHelpTooltip]'
})
export class HelpTooltipDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<void>,
    private vcRef: ViewContainerRef,
    private cfResolver: ComponentFactoryResolver,
  ) { }

  @Input('appHelpTooltip') tooltip: string;

  helpTooltipCompRef: ComponentRef<HelpTooltipComponent>;

  ngOnInit(): void {
    this.vcRef.createEmbeddedView(this.templateRef);
    if(this.tooltip) {
      const helpTooltipCompFactory = this.cfResolver.resolveComponentFactory(HelpTooltipComponent);
      this.helpTooltipCompRef = this.vcRef.createComponent(helpTooltipCompFactory);
      this.helpTooltipCompRef.instance.tooltip = this.tooltip;
    }
  }
}
