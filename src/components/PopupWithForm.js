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
    this.formValues = {};
    this.form.querySelectorAll(".modal__input").forEach((input) => {
      this.formValues[input.name] = input.value;
    });
    return this.formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.renderLoading(true); // Show "Saving..." text
      this.handleFormSubmit(this.getInputValues())
        .then(() => {
          this.form.reset();
          if (this.formValidator) {
            this.formValidator.toggleButtonState();
          }
          this.close(); // Close the popup after submission
        })
        .catch((err) => {
          console.error(err); // Log the error
        })
        .finally(() => {
          this.renderLoading(false); // Reset to original text
        });
    });
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
    this.renderLoading(false); // Reset button text to default when the popup is opened
  }

  close() {
    super.close();
    if (this.formValidator) {
      this.formValidator.toggleButtonState();
    }
    this.renderLoading(false); // Reset button text to default when the popup is closed
  }

  setSubmitAction(action) {
    this.handleFormSubmit = action;
  }
}
