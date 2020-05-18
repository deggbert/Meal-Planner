import { Component, OnInit } from '@angular/core';

import { Food } from '../food-interface';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.css']
})
export class FoodEditComponent implements OnInit {

  editFood: Food = {};

  constructor() { }

  ngOnInit(): void {
  }

}
