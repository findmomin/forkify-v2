// Module imports
import '../sass/main.scss';
// import { elements } from './view/base';
import { Recipe } from './models/Recipe';
import RecipeView from './view/recipeView';

// The state
const state: { recipe?: Recipe } = {};

const controlRecipes = async () => {
  // Getting the recipe id from the URL
  const recipeId = location.hash.slice(1);

  if (!recipeId) return;

  // Render the display while getting recipe
  RecipeView.renderSpinner();

  // Creating the recipe object with the recipe id
  state.recipe = new Recipe(recipeId);
  const recipe = state.recipe;

  // Getting the recipe details
  await recipe.getRecipe();

  //  Rendering the recipe
  RecipeView.render(recipe);
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
