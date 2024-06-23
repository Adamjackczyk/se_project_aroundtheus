import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._submitButton = this._form.querySelector(".modal__button");
    this._inactiveButtonClass = "modal__button_disabled";
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _toggleButtonState() {
    const hasInvalidInput = Array.from(this._inputList).some(
      (input) => !input.validity.valid
    );
    if (hasInvalidInput) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("input", () => this._toggleButtonState());
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
      this._toggleButtonState();
    });
  }

  open() {
    super.open();
    this._toggleButtonState();
  }

  setEventListeners() {
    this._setEventListeners();
  }
}
