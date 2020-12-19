import * as Interfaces from '../Interfaces';
import { elements } from './base';
import View from './View';
import { generateMarkup } from './previewView';

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

    return generateMarkup(data);
  }
}

export default new SearchView();
