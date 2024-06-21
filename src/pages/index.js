import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, formValidationOptions } from "../utils/constants.js";
import "./index.css";

/*
 * ==============================================================================
 * Function to handle image click
 * ==============================================================================
 */
function handleImageClick(name, link) {
  popupWithImage.open({ name, link });
}

/*
 * ==============================================================================
 * Function to create a card
 * ==============================================================================
 */
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

/*
 * ==============================================================================
 * Initialize cards using Section class
 * ==============================================================================
 */
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);

section.renderItems();

/*
 * ==============================================================================
 * Initialize form validators
 * ==============================================================================
 */
const formValidators = {};
document
  .querySelectorAll(formValidationOptions.formSelector)
  .forEach((formElement) => {
    const formValidator = new FormValidator(formValidationOptions, formElement);
    formValidator.enableValidation();
    formValidators[formElement.getAttribute("id")] = formValidator;
  });

/*
 * ==============================================================================
 * Instantiate UserInfo class
 * ==============================================================================
 */
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-desc",
});

/*
 * ==============================================================================
 * Instantiate PopupWithForm for Edit Profile and Add Card modals
 * ==============================================================================
 */
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues.title,
      job: inputValues.description,
    });
    profileEditPopup.close();
  }
);

const addCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  const newCardData = {
    name: inputValues.title,
    link: inputValues.link,
  };
  const cardElement = createCard(newCardData);
  section.addItem(cardElement);
  addCardPopup.close();
});

profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();

const popupWithImage = new PopupWithImage("#modal-image-display");
popupWithImage.setEventListeners();

/*
 * ==============================================================================
 * Event listeners for opening modals
 * ==============================================================================
 */
document.getElementById("profile-edit-button").addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.getElementById("profile-title-input").value = userData.name;
  document.getElementById("profile-description-input").value = userData.job;
  profileEditPopup.open();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});

/*
 * ==============================================================================
 * Event listener for closing the image modal
 * ==============================================================================
 */
document
  .querySelector("#modal-image-close-button")
  .addEventListener("click", () => {
    popupWithImage.close();
  });

/*
 * ==============================================================================
 * Close modals by clicking outside the content
 * ==============================================================================
 */
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      modal.classList.remove("modal_opened");
    }
  });
});
