// Module imports
import '../sass/main.scss';
import { Recipe } from './models/Recipe';
import { Search } from './models/Search';
import RecipeView from './view/recipeView';
import SearchView from './view/searchView';
import PaginationView from './view/paginationView';

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
    SearchView.renderSpinner();

    // Creating the search object
    state.search = new Search(searchQuery);

    // Getting the recipe array
    await state.search.getSearchResults();

    // Rendering the results
    SearchView.render(
      state.search.getSearchResultsPage(state.search.currentPage)
    );

    // Rendering the initial pagination buttons
    PaginationView.render(state.search);
  } catch (err) {
    SearchView.renderError();
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

    // Getting the recipe details
    await state.recipe.getRecipe();

    // Rendering the recipe
    RecipeView.render(state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

// Pagination buttons controler
const controlPagination = (e: Event) => {
  const btn = (e.target as HTMLElement).closest(
    '.btn--inline'
  ) as HTMLButtonElement;

  if (!btn) return;

  // Updating the current page
  state.search!.currentPage += +btn.dataset.value!;

  // Re-rendering the results and btns
  SearchView.render(
    state.search!.getSearchResultsPage(state.search!.currentPage)
  );
  PaginationView.render(state.search!);
};

// Update servings buttons controler
const controlServings = (e: Event) => {
  const btn = (e.target as HTMLElement).closest(
    '.btn--tiny'
  ) as HTMLButtonElement;

  // If not clicked on the button then return
  if (!btn) return;

  // Update the servings in the state
  state.recipe!.updateServings(state.recipe!.servings + +btn.dataset.value!);

  // Update the view (re-render)
  RecipeView.render(state.recipe!);
};

// App initializer
const init = async () => {
  // Handler for the search
  SearchView.addHandlerSearch(controlSearch);

  // Handler for the recipe & update servings
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);

  // Handler for the pagination btns click
  PaginationView.addHandlerClick(controlPagination);
};

init();
