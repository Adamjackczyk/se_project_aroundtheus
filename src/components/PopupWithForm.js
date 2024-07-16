import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formValidator = null) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this._popup.querySelector(".modal__form");
    this.formValidator = formValidator;
    this.submitButton = this.form.querySelector(".modal__button");
    this.submitButtonText = this.submitButton.textContent;
  }

  getInputValues() {
    const formValues = {};
    this.form.querySelectorAll(".modal__input").forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(data) {
    this.form.querySelectorAll(".modal__input").forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.renderLoading(true); // Show "Saving..." text
      this.handleFormSubmit(this.getInputValues())
        .then(() => {
          this.form.reset();
          if (this.formValidator) {
            this.formValidator.toggleButtonState();
          }
          this.close();
        })
        .catch((err) => {
          console.error("Form submission error:", err);
        })
        .finally(() => {
          this.renderLoading(false);
        });
    });
    super.setEventListeners();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.submitButton.textContent = "Saving...";
    } else {
      this.submitButton.textContent = this.submitButtonText;
    }
  }

  open() {
    super.open();
    if (this.formValidator) {
      this.formValidator.resetValidation();
    }
  }

  close() {
    super.close();
  }

  setSubmitAction(action) {
    this.handleFormSubmit = action;
  }
}
