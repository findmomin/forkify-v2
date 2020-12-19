import * as Interfaces from '../Interfaces';
import * as config from '../config';
import { getJSON } from '../helpers';

export class Recipe implements Interfaces.Recipe {
  cooking_time!: number;
  image_url!: string;
  ingredients!: Interfaces.Ingredient[];
  publisher!: string;
  servings!: number;
  source_url!: string;
  title!: string;
  isBookmarked = false;

  constructor(public id: string) {
    //
  }

  async getRecipe(bookmarks: Interfaces.Recipe[]) {
    try {
      // Getting the recipe
      const json = await getJSON(`${config.API_URL}${this.id}`);

      // Pulling the recipe from the data
      const {
        data: { recipe },
      }: { data: { recipe: Interfaces.Recipe } } = json;

      // Assigning the recipe properties to the class properties
      this.cooking_time = recipe.cooking_time;
      this.image_url = recipe.image_url;
      this.ingredients = recipe.ingredients;
      this.publisher = recipe.publisher;
      this.servings = recipe.servings;
      this.source_url = recipe.source_url;
      this.title = recipe.title;
      this.isBookmarked = bookmarks?.some(recipe => recipe.id === this.id)
        ? true
        : false;
    } catch (err) {
      throw err;
    }
  }

  updateServings(numberOfServings: number) {
    if (numberOfServings < 1) return;

    this.ingredients.forEach(
      ingredient =>
        (ingredient.quantity =
          (ingredient.quantity * numberOfServings) / this.servings)
    );
    this.servings = numberOfServings;
  }
}
