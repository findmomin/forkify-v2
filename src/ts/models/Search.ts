import * as Interfaces from '../Interfaces';
import * as config from '../config';
import { getJSON } from '../helpers';

export class Search {
  results!: Interfaces.SearchResults;

  constructor(public searchQuery: string) {
    //
  }

  async getSearchResults() {
    try {
      // Getting the search results
      const json = await getJSON(
        `${config.API_URL}?search=${this.searchQuery}`
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
}
