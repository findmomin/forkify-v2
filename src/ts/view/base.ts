// DOM elements
export const elements = {
  recipeContainer: document.querySelector('.recipe') as HTMLDivElement,
  searchForm: document.querySelector('.search') as HTMLFormElement,
  searchInput: document.querySelector('.search__field') as HTMLInputElement,
  resultsContainer: document.querySelector('.results') as HTMLUListElement,
  pagination: document.querySelector('.pagination') as HTMLDivElement,
  bookmarksContainer: document.querySelector(
    '.bookmarks__list'
  ) as HTMLUListElement,
  addRecipeForm: document.querySelector('.upload') as HTMLFormElement,
  addRecipeOpenButton: document.querySelector(
    '.nav__btn--add-recipe'
  ) as HTMLButtonElement,
  addRecipeCloseButton: document.querySelector(
    '.btn--close-modal'
  ) as HTMLButtonElement,
  addRecipeOverlay: document.querySelector('.overlay') as HTMLDivElement,
  addRecipeWindow: document.querySelector(
    '.add-recipe-window'
  ) as HTMLDivElement,
  homeLink: document.querySelector('.home-link') as HTMLLinkElement,
};
