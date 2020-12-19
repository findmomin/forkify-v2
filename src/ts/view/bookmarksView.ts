import * as Interfaces from '../Interfaces';
import { elements } from './base';
import View from './View';
import { generateMarkup } from './previewView';

class BookmarksView extends View {
  parentEl = elements.bookmarksContainer;
  errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  message = '';

  generateMarkup() {
    const data = this.data as Interfaces.SearchResults;

    return generateMarkup(data);
  }
}

export default new BookmarksView();
