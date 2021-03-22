import { ComponentFactoryResolver, Directive, OnInit, TemplateRef, ViewContainerRef, ComponentRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { UnitsContainerComponent } from './units-container/units-container.component';

@Directive({
  selector: '[appUnits]'
})
export class UnitsDirective implements OnChanges, OnInit {
  constructor(
    private tplRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private cfResolver: ComponentFactoryResolver,
  ) { }
  @Input('appUnits') units: string;
  @Input('appUnitsUnitSystem') unitSystem: string;
  @Input('appUnitsValue') value: number | string;

  private _unitsContainerCompRef: ComponentRef<UnitsContainerComponent>;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this._unitsContainerCompRef) {
      for (const propName in changes){
        this._unitsContainerCompRef.instance[propName] = changes[propName].currentValue;
      }
    }
  }    

  ngOnInit(): void { 
    if (this.units) {
      const unitsContainerCompFactory = this.cfResolver.resolveComponentFactory(UnitsContainerComponent);
      this._unitsContainerCompRef = this.vcRef.createComponent(unitsContainerCompFactory);
      this._unitsContainerCompRef.instance.tpl = this.tplRef;
      this._unitsContainerCompRef.instance.units = this.units;
      this._unitsContainerCompRef.instance.unitSystem = this.unitSystem;
      this._unitsContainerCompRef.instance.value = this.value;
    } else {
      this.vcRef.createEmbeddedView(this.tplRef);
    }
  }
}
