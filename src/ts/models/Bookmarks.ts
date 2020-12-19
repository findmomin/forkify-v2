import * as Interfaces from '../Interfaces';

export class Bookmark {
  bookmarks: Interfaces.Recipe[] = [];

  constructor() {
    //
  }

  addBookmark(recipe: Interfaces.Recipe) {
    // Push the recipe
    this.bookmarks.push(recipe);

    // Mark the recipe as bookmarked
    recipe.isBookmarked = true;
  }

  removeBookmark(recipe: Interfaces.Recipe) {
    const recipeIndex = this.bookmarks.findIndex(
      bookmark => bookmark.id === recipe.id
    );

    // Removing the recipe from the bookmakrs[]
    this.bookmarks.splice(recipeIndex, 1);

    // Mark the recipe as not bookmarked
    recipe.isBookmarked = false;
  }
}
