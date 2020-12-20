import * as Interfaces from '../Interfaces';
import * as config from '../config';
import { getJSON, sendJSON } from '../helpers';

export class Recipe {
  recipe!: Interfaces.Recipe | Interfaces.UserRecipe;

  constructor(public id: string) {
    //
  }

  async getRecipe(bookmarks: Interfaces.Recipe[]) {
    try {
      // Getting the recipe
      const json = await getJSON(
        `${config.API_URL}${this.id}?key=${config.API_KEY}`
      );

      // Pulling the recipe from the data
      const {
        data: { recipe },
      }: { data: { recipe: Interfaces.Recipe } } = json;

      // Assigning the recipe to the class
      this.recipe = recipe;
      this.recipe.isBookmarked = bookmarks?.some(
        recipe => recipe.id === this.id
      )
        ? true
        : false;
    } catch (err) {
      throw err;
    }
  }

  updateServings(numberOfServings: number) {
    if (numberOfServings < 1) return;

    this.recipe.ingredients.forEach(
      ingredient =>
        (ingredient.quantity =
          (ingredient.quantity * numberOfServings) / this.recipe.servings)
    );
    this.recipe.servings = numberOfServings;
  }

  async uploadRecipe(formData: { [k: string]: FormDataEntryValue }) {
    try {
      // Converting the data into a valid recipe
      const ingredients: Interfaces.Ingredient[] = Object.entries(formData)
        .filter(el => el[0].startsWith('ingredient') && el[1])
        .map(el => {
          const ingDetails = (el[1] as string).split(',');

          if (ingDetails.length < 3) throw new Error();

          const [quantity, unit, description] = ingDetails;

          const ingredient: Interfaces.Ingredient = {
            quantity: +quantity,
            unit: unit ? unit : '',
            description: description ? description : '',
          };

          return ingredient;
        });

      const userRcipe: Interfaces.Recipe = {
        id: '',
        cooking_time: +formData.cookingTime,
        image_url: formData.image as string,
        ingredients,
        publisher: formData.image as string,
        servings: +formData.servings,
        source_url: formData.image as string,
        title: formData.image as string,
        isBookmarked: false,
      };

      // Receiving the created recipe from the server
      const {
        data: { recipe },
      }: { data: { recipe: Interfaces.UserRecipe } } = await sendJSON(
        `${config.API_URL}?key=${config.API_KEY}`,
        userRcipe
      );

      // Assigning the recipe to the class
      this.recipe = recipe;
      this.recipe.isBookmarked = true;
    } catch (err) {
      throw err;
    }
  }
}
