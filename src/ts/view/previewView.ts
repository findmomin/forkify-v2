import * as Interfaces from '../Interfaces';

export const generateMarkup = (recipes: Interfaces.RecipePartial[]) => {
  const recipeId = location.hash.slice(1);

  return recipes
    ?.map(recipe => {
      return `
     <li class="preview">
       <a class="preview__link ${
         recipeId === recipe.id ? 'preview__link--active' : ''
       }" href="#${recipe.id}">
         <figure class="preview__fig">
           <img src="${recipe.image_url}" alt="${recipe.title}">
         </figure>
         <div class="preview__data">
           <h4 class="preview__title">${recipe.title}</h4>
           <p class="preview__publisher">${recipe.publisher}</p>
           ${
             (recipe as Interfaces.UserRecipe).key
               ? `
          <div class="preview__user-generated">
             <svg>
               <use href="img/icons.svg#icon-user"></use>
             </svg>
           </div>
          `
               : ''
           }
         </div>
       </a>
     </li>
     `;
    })
    .join('');
};
