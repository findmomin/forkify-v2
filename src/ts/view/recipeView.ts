import Fraction from 'fraction.js';
import * as Interfaces from '../Interfaces';
import { elements } from './base';

export class RecipeView {
  private parentEl = elements.recipeContainer;
  private data!: Interfaces.Recipe;
  private errorMessage =
    'We could not find that recipe. Please try another one!';
  private message = '';

  constructor() {
    //
  }

  render(data: Interfaces.Recipe) {
    this.data = data;

    this.clear();

    const markup = this.generateMarkup();

    // Inserting the recipe to the dom
    this.parentEl.innerHTML = '';
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handlerFn: (e: Event) => {}) {
    ['hashchange', 'load'].forEach(e => window.addEventListener(e, handlerFn));
  }

  clear() {
    this.parentEl.innerHTML = '';
  }

  renderSpinner() {
    this.parentEl.innerHTML = `
      <div class="spinner">
         <svg>
         <use href="img/icons.svg#icon-loader"></use>
         </svg>
      </div>
  `;
  }

  renderError(message: string = this.errorMessage) {
    this.parentEl.innerHTML = `
       <div class="error">
         <div>
            <svg>
               <use href="img/icons.svg#icon-alert-triangle"></use>
            </svg>
         </div>
         <p>${message}</p>
      </div>
    `;
  }

  renderMessage(message: string = this.message) {
    this.parentEl.innerHTML = `
       <div class="message">
         <div>
            <svg>
               <use href="img/icons.svg#icon-smile"></use>
            </svg>
         </div>
         <p>${message}</p>
      </div>
    `;
  }

  private generateMarkup() {
    return `
          <figure class="recipe__fig">
         <img src="${this.data.image_url}" alt="${
      this.data.title
    }" class="recipe__img" />
         <h1 class="recipe__title">
         <span>${this.data.title}</span>
         </h1>
      </figure>
      <div class="recipe__details">
         <div class="recipe__info">
         <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-clock"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--minutes">${
           this.data.cooking_time
         }</span>
         <span class="recipe__info-text">minutes</span>
         </div>
         <div class="recipe__info">
         <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-users"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--people">${
           this.data.servings
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
         ${this.data.ingredients.map(this.generateRecipeIngredient).join('')}
         </ul>
      </div>
      <div class="recipe__directions">
         <h2 class="heading--2">How to cook it</h2>
         <p class="recipe__directions-text">
         This recipe was carefully designed and tested by
         <span class="recipe__publisher">${
           this.data.publisher
         }</span>. Please check out
         directions at their website.
         </p>
         <a
         class="btn--small recipe__btn"
         href="${this.data.source_url}"
         target="_blank"
         >
         <span>Directions</span>
         <svg class="search__icon">
            <use href="img/icons.svg#icon-arrow-right"></use>
         </svg>
         </a>
      </div>
     `;
  }

  generateRecipeIngredient(ingredient: Interfaces.Ingredient) {
    return `
     <li class="recipe__ingredient">
        <svg class="recipe__icon">
           <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ingredient.quantity
            ? new Fraction(ingredient.quantity).toFraction(true)
            : ''
        }</div>
        <div class="recipe__description">
           <span class="recipe__unit">${ingredient.unit}</span>
           ${ingredient.description}
        </div>
     </li>
     `;
  }
}

export default new RecipeView();
