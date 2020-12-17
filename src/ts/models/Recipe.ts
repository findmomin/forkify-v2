import * as Interfaces from './Interfaces';
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

  constructor(public id: string) {
    //
  }

  async getRecipe() {
    try {
      // Getting the recipe
      const data = await getJSON(`${config.API_URL}/${this.id}`);

      // Pulling the recipe from the data
      const {
        data: { recipe },
      }: { data: { recipe: Interfaces.Recipe } } = data;

      // Assigning the recipe properties to the class properties
      this.cooking_time = recipe.cooking_time;
      this.image_url = recipe.image_url;
      this.ingredients = recipe.ingredients;
      this.publisher = recipe.publisher;
      this.servings = recipe.servings;
      this.source_url = recipe.source_url;
      this.title = recipe.title;
    } catch (err) {
      throw err;
    }
  }
}
