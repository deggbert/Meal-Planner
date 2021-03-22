import { Pipe, PipeTransform } from '@angular/core';
import { unitSystems } from 'src/app/shared/models/unit-systems.model';

@Pipe({
  name: 'units'
})
export class UnitsPipe implements PipeTransform {

  transform(value: number, unitSystem?: string, measurement?: string): (number | string) {
    if (!measurement) {
      return value;
    }
    return value + ' ' + unitSystems[unitSystem][measurement];
  }

}
