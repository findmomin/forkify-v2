// Module imports
import '../sass/main.scss';

// DOM elements
const elements = {
  recipeContainer: document.querySelector('.recipe') as HTMLDivElement,
};

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

const renderSpinner = (parentEl: HTMLElement) =>
  (parentEl.innerHTML = `
   <div class="spinner">
      <svg>
      <use href="img/icons.svg#icon-loader"></use>
      </svg>
   </div>
  `);

const showRecipe = async () => {
  try {
    // Getting the recipe id from the hash
    const recipeId = location.hash.slice(1);

    if (!recipeId) return;

    // Render the display while getting recipe
    renderSpinner(elements.recipeContainer);

    // Getting the recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );
    const data = await res.json();

    if (!res.ok)
      throw new Error(`${(data as RecipeErrorResponse).message} ${res.status}`);

    // Pulling the recipe from the data
    const {
      data: { recipe },
    }: { data: { recipe: Recipe } } = data;

    //  Rendering the recipe
    const markup = `
      <figure class="recipe__fig">
         <img src="${recipe.image_url}" alt="${
      recipe.title
    }" class="recipe__img" />
         <h1 class="recipe__title">
         <span>${recipe.title}</span>
         </h1>
      </figure>
      <div class="recipe__details">
         <div class="recipe__info">
         <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-clock"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--minutes">${
           recipe.cooking_time
         }</span>
         <span class="recipe__info-text">minutes</span>
         </div>
         <div class="recipe__info">
         <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-users"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--people">${
           recipe.servings
         }</span>
         <span class="recipe__info-text">servings</span>
         <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
               <svg>
               <use href="img/icons.svg#icon-minus-circle"></use>
               </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
               <svg>
               <use href="img/icons.svg#icon-plus-circle"></use>
               </svg>
            </button>
         </div>
         </div>
         <div class="recipe__user-generated">
         <svg>
            <use href="img/icons.svg#icon-user"></use>
         </svg>
         </div>
         <button class="btn--round">
         <svg class="">
            <use href="img/icons.svg#icon-bookmark-fill"></use>
         </svg>
         </button>
      </div>
      <div class="recipe__ingredients">
         <h2 class="heading--2">Recipe ingredients</h2>
         <ul class="recipe__ingredient-list">
         ${recipe.ingredients
           .map(ing => {
             return `
            <li class="recipe__ingredient">
               <svg class="recipe__icon">
                  <use href="img/icons.svg#icon-check"></use>
               </svg>
               <div class="recipe__quantity">${ing.quantity}</div>
               <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
               </div>
            </li>
            `;
           })
           .join('')}
         </ul>
      </div>
      <div class="recipe__directions">
         <h2 class="heading--2">How to cook it</h2>
         <p class="recipe__directions-text">
         This recipe was carefully designed and tested by
         <span class="recipe__publisher">${
           recipe.publisher
         }</span>. Please check out
         directions at their website.
         </p>
         <a
         class="btn--small recipe__btn"
         href="${recipe.source_url}"
         target="_blank"
         >
         <span>Directions</span>
         <svg class="search__icon">
            <use href="img/icons.svg#icon-arrow-right"></use>
         </svg>
         </a>
      </div>
   `;

    // Inserting the recipe to the dom
    elements.recipeContainer.innerHTML = '';
    elements.recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    console.log(err);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);
