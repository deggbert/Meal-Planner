export interface DailyMealPlan {
  breakfast: Meal[],
  lunch: Meal[],
  dinner: Meal[]
}

export interface Meal {
  docId: string,
  num: number,
  servings: number,
  mealplan: boolean,
}