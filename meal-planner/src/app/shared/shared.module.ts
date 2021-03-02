import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormQuestionComponent } from './components/dynamic-forms/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './components/dynamic-forms/dynamic-form/dynamic-form.component';

import { FoodInputComponent } from './components/food-input/food-input.component';
import { FoodSearchComponent } from './components/food-search/food-search.component';

import { SortByPipe } from 'src/app/shared/pipes/sortBy';

import { TooltipDirective } from './directives/tooltip-directive/tooltip.directive';
import { TooltipComponent } from './directives/tooltip-directive/tooltip/tooltip.component';
import { HelpTooltipDirective } from './directives/help-tooltip-directive/help-tooltip.directive';
import { HelpTooltipComponent } from './directives/help-tooltip-directive/help-tooltip/help-tooltip.component';
import { UnitsDirective } from './directives/units-directive/units.directive';
import { UnitsContainerComponent } from './directives/units-directive/units-container/units-container.component';

@NgModule({
  declarations: [
    DynamicFormQuestionComponent,
    DynamicFormComponent,

    FoodInputComponent,
    FoodSearchComponent,

    SortByPipe,

    TooltipDirective,
    TooltipComponent,
    HelpTooltipDirective,
    HelpTooltipComponent,
    UnitsDirective,
    UnitsContainerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    DynamicFormQuestionComponent,
    DynamicFormComponent,

    FoodInputComponent,
    FoodSearchComponent,

    SortByPipe,

    TooltipDirective,
    HelpTooltipDirective,
    UnitsDirective,
  ]
})
export class SharedModule { }
