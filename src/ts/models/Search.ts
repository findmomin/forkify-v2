import * as Interfaces from '../Interfaces';
import * as config from '../config';
import { getJSON } from '../helpers';

export class Search {
  results!: Interfaces.SearchResults;
  currentPage = 1;

  constructor(public searchQuery: string) {
    //
  }

  async getSearchResults() {
    try {
      // Getting the search results
      const json = await getJSON(
        `${config.API_URL}?search=${this.searchQuery}&key=${config.API_KEY}`
      );

      // Pulling the recipes array from the results
      const {
        data: { recipes },
      }: { data: { recipes: Interfaces.SearchResults } } = json;

      // Assigning all the recipes to the class
      this.results = recipes;
    } catch (err) {
      throw err;
    }
  }

  getSearchResultsPage(page: number = this.currentPage) {
    const start = (page - 1) * config.RES_PER_PAGE;
    const end = page * config.RES_PER_PAGE;

    this.currentPage = page;

    return this.results.slice(start, end);
  }
}
