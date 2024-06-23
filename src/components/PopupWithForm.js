import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formValidator) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._formValidator = formValidator;
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
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
      this._formValidator.toggleButtonState();
    });
  }

  open() {
    super.open();
    this._formValidator.resetValidation();
  }
}
