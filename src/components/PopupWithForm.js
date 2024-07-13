import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formValidator = null) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._formValidator = formValidator;
    this._submitButton = this._form.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
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
          this.close(); // Close the popup after submission
        })
        .catch(() => {
          this._renderLoading(false); // Ensure to reset in case of error
        });
      this._form.reset();
      if (this._formValidator) {
        this._formValidator.toggleButtonState();
      }
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
    this._form.reset();
    if (this._formValidator) {
      this._formValidator.toggleButtonState();
    }
    this._renderLoading(false); // Reset button text to default when the popup is closed
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }
}
