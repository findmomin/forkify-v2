import * as Interfaces from '../Interfaces';

export class Bookmark {
  bookmarks: Interfaces.Recipe[] = [];

  constructor() {
    this.getBookmarks();
  }

  addBookmark(recipe: Interfaces.Recipe) {
    // Push the recipe
    this.bookmarks.push(recipe);

    // Mark the recipe as bookmarked
    recipe.isBookmarked = true;

    // Save the bookmarks to localStorage
    this.persistBookmark();
  }

  removeBookmark(recipe: Interfaces.Recipe) {
    const recipeIndex = this.bookmarks.findIndex(
      bookmark => bookmark.id === recipe.id
    );

    // Removing the recipe from the bookmarks[]
    this.bookmarks.splice(recipeIndex, 1);

    // Mark the recipe as not bookmarked
    recipe.isBookmarked = false;

    // Save the bookmarks to localStorage
    this.persistBookmark();
  }

  persistBookmark() {
    localStorage.setItem('recipeBookmarks', JSON.stringify(this.bookmarks));
  }

  getBookmarks() {
    const bookmarks = localStorage.getItem('recipeBookmarks');

    if (bookmarks) this.bookmarks = JSON.parse(bookmarks);
  }
}
