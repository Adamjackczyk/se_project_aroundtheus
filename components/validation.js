// function showInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessageElement = formElement.querySelector(
//     `#${inputElement.id}-error`
//   );
//   inputElement.classList.add(inputErrorClass);
//   errorMessageElement.textContent = inputElement.validationMessage;
//   errorMessageElement.classList.add(errorClass);
// }

// function hideInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessageElement = formElement.querySelector(
//     `#${inputElement.id}-error`
//   );
//   inputElement.classList.remove(inputErrorClass);
//   errorMessageElement.textContent = "";
//   errorMessageElement.classList.remove(errorClass);
// }

// function checkInputValidity(formElement, inputElement, options) {
//   if (!inputElement.validity.valid) {
//     return showInputError(formElement, inputElement, options);
//   }
//   hideInputError(formElement, inputElement, options);
// }

// function hasInvalidInput(inputList) {
//   return !inputList.every((inputElement) => inputElement.validity.valid);
// }

// function toggleButtonState(
//   inputElements,
//   submitButton,
//   { inactiveButtonClass }
// ) {
//   if (hasInvalidInput(inputElements)) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//     return;
//   }
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

// function setEventListeners(formElement, options) {
//   // const inputSelector = options.inputSelector <-- means the same thing
//   const { inputSelector, submitButtonSelector } = options;
//   const inputElements = [...formElement.querySelectorAll(inputSelector)];
//   const submitButton = formElement.querySelector(submitButtonSelector);
//   inputElements.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       checkInputValidity(formElement, inputElement, options);
//       toggleButtonState(inputElements, submitButton, options);
//     });
//   });
// }

// function enableValidation(options) {
//   // [... ] <-- like Array.from()
//   const formElements = [...document.querySelectorAll(options.formSelector)];
//   formElements.forEach((formElement) => {
//     formElement.addEventListener("submit", (e) => {
//       e.preventDefault();
//     });
//     setEventListeners(formElement, options);
//     //look for all inputs inside of form
//     // loop through all the inputs to see if all are valid
//     //if any input is not valid
//     //get the validation msg
//     //add error class to input
//     // display error msg
//     //disable button
//     //if all inputs are valid
//     // enable button
//     // reset error msg
//   });
// }

// const options = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

// enableValidation(options);
