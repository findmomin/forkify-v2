import * as Interfaces from '../Interfaces';
import * as config from '../config';
import { getJSON } from '../helpers';

export class Search {
  results!: Interfaces.SearchResults;
  currentPage = 1;
  supportedQueries = [
    'carrot',
    'broccoli',
    'asparagus',
    'cauliflower',
    'corn',
    'cucumber',
    'green pepper',
    'lettuce',
    'mushrooms',
    'onion',
    'potato',
    'pumpkin',
    'red pepper',
    'tomato',
    'beetroot',
    'brussel sprouts',
    'peas',
    'zucchini',
    'radish',
    'sweet potato',
    'artichoke',
    'leek',
    'cabbage',
    'celery',
    'chili',
    'garlic',
    'basil',
    'coriander',
    'parsley',
    'dill',
    'rosemary',
    'oregano',
    'cinnamon',
    'saffron',
    'green bean',
    'bean',
    'chickpea',
    'lentil',
    'apple',
    'apricot',
    'avocado',
    'banana',
    'blackberry',
    'blackcurrant',
    'blueberry',
    'boysenberry',
    'cherry',
    'coconut',
    'fig',
    'grape',
    'grapefruit',
    'kiwifruit',
    'lemon',
    'lime',
    'lychee',
    'mandarin',
    'mango',
    'melon',
    'nectarine',
    'orange',
    'papaya',
    'passion fruit',
    'peach',
    'pear',
    'pineapple',
    'plum',
    'pomegranate',
    'quince',
    'raspberry',
    'strawberry',
    'watermelon',
    'salad',
    'pizza',
    'pasta',
    'popcorn',
    'lobster',
    'steak',
    'bbq',
    'pudding',
    'hamburger',
    'pie',
    'cake',
    'sausage',
    'tacos',
    'kebab',
    'poutine',
    'seafood',
    'chips',
    'fries',
    'masala',
    'paella',
    'som tam',
    'chicken',
    'toast',
    'marzipan',
    'tofu',
    'ketchup',
    'hummus',
    'chili',
    'maple syrup',
    'parma ham',
    'fajitas',
    'champ',
    'lasagna',
    'poke',
    'chocolate',
    'croissant',
    'arepas',
    'bunny chow',
    'pierogi',
    'donuts',
    'rendang',
    'sushi',
    'ice cream',
    'duck',
    'curry',
    'beef',
    'goat',
    'lamb',
    'turkey',
    'pork',
    'fish',
    'crab',
    'bacon',
    'ham',
    'pepperoni',
    'salami',
    'ribs',
  ];
  randomQuery: string;

  constructor(public searchQuery: string) {
    this.randomQuery = this.supportedQueries[
      Math.floor(Math.random() * this.supportedQueries.length)
    ];
  }

  async getSearchResults(searchQuery?: string) {
    try {
      // Getting the search results
      const json = await getJSON(
        `${config.API_URL}?search=${
          searchQuery ? searchQuery : this.searchQuery
        }&key=${config.API_KEY}`
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

  async getRandomResults() {
    await this.getSearchResults(this.randomQuery);
  }
}
