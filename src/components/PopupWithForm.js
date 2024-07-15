import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formValidator = null) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._formValidator = formValidator;
    this._submitButton = this._form.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._wasSubmitted = false; // Track whether the form was submitted
  }

  _getInputValues() {
    this._formValues = {};
    this._form.querySelectorAll(".modal__input").forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._renderLoading(true); // Show "Saving..." text
      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this._renderLoading(false); // Reset to original text
          this._form.reset();
          if (this._formValidator) {
            this._formValidator.toggleButtonState();
          }
          this._wasSubmitted = true; // Mark the form as submitted
          this.close(); // Close the popup after submission
        })
        .catch(() => {
          this._renderLoading(false); // Ensure to reset in case of error
        });
    });
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  open() {
    super.open();
    if (this._formValidator) {
      this._formValidator.resetValidation();
    }
    this._renderLoading(false); // Reset button text to default when the popup is opened
  }

  close() {
    super.close();
    if (this._wasSubmitted) {
      this._form.reset(); // Only reset the form if it was submitted
      this._wasSubmitted = false; // Reset the submitted state
    }
    if (this._formValidator) {
      this._formValidator.toggleButtonState();
    }
    this._renderLoading(false); // Reset button text to default when the popup is closed
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }
}
