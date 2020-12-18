import * as Interfaces from '../Interfaces';
import { Search } from '../models/Search';

export default abstract class View {
  data!: Interfaces.Recipe | Interfaces.SearchResults | Search;
  abstract parentEl: HTMLElement;
  abstract errorMessage: string;
  abstract message: string;

  constructor() {
    //
  }

  abstract generateMarkup(): string;

  render(data: Interfaces.Recipe | Interfaces.SearchResults | Search) {
    if (
      !data ||
      (Array.isArray(data) && !(data as Interfaces.SearchResults).length)
    )
      return this.renderError();

    this.data = data;

    this.clear();

    const markup = this.generateMarkup();

    // Inserting the recipe to the dom
    this.parentEl.innerHTML = '';
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
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
}
