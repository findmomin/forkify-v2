// Search result Array
export type SearchResults = RecipePartial[];

// Interface for the recipe Error response
export interface RecipeErrorResponse {
  message: string;
}

// Each ingredient of the recipe
export interface Ingredient {
  description: string;
  quantity: number;
  unit: string;
}

// The recipe
export interface Recipe {
  cooking_time: number;
  id: string;
  image_url: string;
  ingredients: Ingredient[];
  publisher: string;
  servings: number;
  source_url: string;
  title: string;
}

export interface RecipePartial {
  id: string;
  image_url: string;
  publisher: string;
  title: string;
}
