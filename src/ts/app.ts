// Module imports
import '../sass/main.scss';
import { Recipe } from './models/Recipe';
import { Search } from './models/Search';
import RecipeView from './view/recipeView';
import SearchView from './view/searchView';

// The state
const state: { recipe?: Recipe; search?: Search } = {};

// The search controller
const controlSearch = async (e: Event) => {
  e.preventDefault();

  try {
    // Getting the search query from the input
    const searchQuery = SearchView.getQuery();

    // If no searchQuery then return
    if (!searchQuery) return;

    // Render the spinner while getting recipe

    // Creating the search object
    state.search = new Search(searchQuery);

    // Getting the recipe array
    await state.search.getSearchResults();

    // Rendering the results
    console.log(state.search);
  } catch (err) {
    // SearchView.renderError();
  }
};

// The recipe controller
const controlRecipes = async () => {
  try {
    // Getting the recipe id from the URL
    const recipeId = location.hash.slice(1);

    // If no id then return
    if (!recipeId) return;

    // Render the spinner while getting recipe
    RecipeView.renderSpinner();

    // Creating the recipe object with the recipe id
    state.recipe = new Recipe(recipeId);
    const recipe = state.recipe;

    // Getting the recipe details
    await recipe.getRecipe();

    // Rendering the recipe
    RecipeView.render(recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

// App initializer
const init = async () => {
  // Handler for the search
  SearchView.addHandlerSearch(controlSearch);

  // Handler for the recipe
  RecipeView.addHandlerRender(controlRecipes);
};

init();
