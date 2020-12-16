import '../sass/main.scss';

// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza

// Interfaces and types
// Interface for the recipe Error response
interface RecipeErrorResponse {
  message: string;
}

// Each ingredient of the recipe
interface Ingredient {
  description: string;
  quantity: number;
  unit: string;
}

// The recipe
interface Recipe {
  cooking_time: number;
  id: string;
  image_url: string;
  ingredients: Ingredient[];
  publisher: string;
  servings: number;
  source_url: string;
  title: string;
}

const showRecipe = async () => {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca79'
    );
    const data = await res.json();

    if (!res.ok)
      throw new Error(`${(data as RecipeErrorResponse).message} ${res.status}`);

    // Pulling the recipe from the data
    const {
      data: { recipe },
    }: { data: { recipe: Recipe } } = data;

    console.log(recipe);
  } catch (err) {
    console.log(err);
  }
};

showRecipe();
