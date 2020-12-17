// import * as Interfaces from '../models/Interfaces';
import { elements } from './base';

class SearchView {
  parentEl = elements.searchForm;
  inputField = elements.searchInput;

  constructor() {
    //
  }

  getQuery() {
    const searchQuery = this.inputField.value;
    this.clearInput();
    return searchQuery;
  }

  private clearInput() {
    this.inputField.value = '';
  }

  addHandlerSearch(handlerFn: (e: Event) => {}) {
    this.parentEl.addEventListener('submit', handlerFn);
  }
}

export default new SearchView();
