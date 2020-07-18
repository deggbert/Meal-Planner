export interface DailyMealPlan {
  breakfastData: Meal[],
  lunchData: Meal[],
  dinnerData: Meal[],
  cutCalories: number,
  fatChosen: number,
  proteinChosen: number,
}

export interface Meal {
  docId: string,
  servings: number,
  mealplan: boolean,
  groceryStoreOrder?: number;
}