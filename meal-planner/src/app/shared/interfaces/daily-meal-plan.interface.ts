export interface DailyMealPlan {
  breakfastData: MealItem[],
  lunchData: MealItem[],
  dinnerData: MealItem[],
  cutCalories: number,
  fatChosen: number,
  proteinChosen: number,
  mealPrepDays: number,
}

export interface MealItem {
  docId: string,
  servings: number,
}