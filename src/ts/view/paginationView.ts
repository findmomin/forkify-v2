// import * as Interfaces from '../Interfaces';
import * as config from '../config';
import { Search } from '../models/Search';
import { elements } from './base';
import View from './View';

class PaginationView extends View {
  parentEl = elements.pagination;
  errorMessage = '';
  message = '';

  generateMarkup() {
    const data = this.data as Search;
    const numPages = Math.ceil(data.results.length / config.RES_PER_PAGE);

    const prevBtn = `
   <button data-value="-1" class="btn--inline pagination__btn--prev">
     <svg class="search__icon">
        <use href="img/icons.svg#icon-arrow-left"></use>
     </svg>
     <span>Page ${data.currentPage - 1}</span>
   </button>
   `;
    const nextBtn = `
   <button data-value="1" class="btn--inline pagination__btn--next">
      <span>Page ${data.currentPage + 1}</span>
      <svg class="search__icon">
         <use href="img/icons.svg#icon-arrow-right"></use>
      </svg>
   </button>
 `;

    // At page 1 & other pages
    if (data.currentPage === 1 && numPages > 1) return nextBtn;

    // At other page
    if (data.currentPage < numPages) return prevBtn + nextBtn;

    // At the last page
    if (data.currentPage === numPages && numPages > 1) return prevBtn;

    // At page 1 & no other pages
    if (data.currentPage === 1 && numPages <= data.currentPage) return '';

    return `${numPages}`;
  }

  addHandlerClick(handlerFn: (e: Event) => void) {
    this.parentEl.addEventListener('click', handlerFn);
  }
}

export default new PaginationView();
