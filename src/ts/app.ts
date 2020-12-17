// Module imports
import '../sass/main.scss';
import { Recipe } from './models/Recipe';
import recipeView from './view/recipeView';
import RecipeView from './view/recipeView';

('No recipes found for your query! Please try again : (');

// The state
const state: { recipe?: Recipe } = {};

const controlRecipes = async () => {
  try {
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
  } catch (err) {
    recipeView.renderError();
  }
};

// App initializer
const init = () => {
  RecipeView.addHandlerRender(controlRecipes);
};

init();
