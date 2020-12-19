import * as Interfaces from '../Interfaces';
import { elements } from './base';
import View from './View';

class SearchView extends View {
  parentEl = elements.resultsContainer;
  errorMessage = 'No recipes found for your query! Please try again : (';
  message = '';
  inputField = elements.searchInput;
  form = elements.searchForm;

  getQuery() {
    const searchQuery = this.inputField.value;
    this.clearInput();
    return searchQuery;
  }

  private clearInput() {
    this.inputField.value = '';
  }

  addHandlerSearch(handlerFn: (e: Event) => void) {
    this.form.addEventListener('submit', handlerFn);
  }

  generateMarkup() {
    const data = this.data as Interfaces.SearchResults;
    const recipeId = location.hash.slice(1);

    return data
      ?.map(recipe => {
        return `
      <li class="preview">
        <a class="preview__link ${
          recipeId === recipe.id ? 'preview__link--active' : ''
        }" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated hidden">
              <svg>
                <use href="img/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
      `;
      })
      .join('');
  }
}

export default new SearchView();
