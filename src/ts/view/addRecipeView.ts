// import * as Interfaces from '../Interfaces';
import { elements } from './base';
import View from './View';

class AddRecipeView extends View {
  parentEl = elements.addRecipeForm;
  openBtn = elements.addRecipeOpenButton;
  closeBtn = elements.addRecipeCloseButton;
  overlay = elements.addRecipeOverlay;
  window = elements.addRecipeWindow;
  errorMessage = '';
  message = '';

  constructor() {
    super();
    this.addHandlerOpenWindow();
    this.addHandlerCloseWindow();
  }

  toggleRecipeEditor() {
    this.overlay.classList.toggle('hidden');
    this.window.classList.toggle('hidden');
  }

  addHandlerOpenWindow() {
    this.openBtn.addEventListener('click', this.toggleRecipeEditor.bind(this));
  }

  addHandlerCloseWindow() {
    [this.overlay, this.closeBtn].forEach(btn =>
      btn.addEventListener('click', this.toggleRecipeEditor.bind(this))
    );
  }

  addHandlerUpload(handlerFn: (formData: {}) => void) {
    this.parentEl.addEventListener('submit', function (e: Event) {
      e.preventDefault();

      // Getting the data form the form
      const data = Object.fromEntries([...new FormData(this)]);

      // Passing the data to the model
      handlerFn(data);
    });
  }

  generateMarkup() {
    return '';
  }
}

export default new AddRecipeView();
