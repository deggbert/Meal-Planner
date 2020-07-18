export interface DailyMacros { 
  fat: DailyMacroValues,
  carb: DailyMacroValues,
  protein: DailyMacroValues,
}

export interface DailyMacroValues {
  nutrient: string;
  recommended: string;
  chosen: number;
  grams: number;
  calories: number;
}