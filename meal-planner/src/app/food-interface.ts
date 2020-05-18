export interface Food {
  // input values
  id?:number,
  name?: string,
  brand?: string,
  containerSize?: number,
  price?: number,
  servingSize?: number,
  fat?: number,
  carb?: number,
  protein?: number,
  // set values
  servingsPerMeal?: number,
  groceryStoreOrder?: number,
  // calculated values
  servingsPerContainer?: number,
  servingSizePerMeal?: number,
  mealsPerContainer?: number,
  pricePerMeal?: number,
  fatPerMeal?: number,
  carbPerMeal?: number,
  proteinPerMeal?: number,
}