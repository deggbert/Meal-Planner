export interface Food {
  // document id
  docId?: string;
  // associated user
  uid?: string;
  // input values
  name?: string;
  brand?: string;
  containerSize?: number;
  price?: number;
  servingSize?: number;
  fat?: number;
  carb?: number;
  protein?: number;
  // set values
  servingsPerMeal?: number;
  pantryQuantity?: number;

  groceryStoreOrder?: number;
  // calculated values
  servingsPerContainer?: number;
  servingSizePerMeal?: number;
  mealsPerContainer?: number;
  pricePerMeal?: number;
  fatPerMeal?: number;
  carbPerMeal?: number;
  proteinPerMeal?: number;

  servingSizePerMealPrep?: number;
  mealPrepsPerContainer?:number;
  // search strings
  nameSearchStrings?: string[];
  brandSearchStrings?: string[];
}