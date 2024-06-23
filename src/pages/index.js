import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, formValidationOptions } from "../utils/constants.js";
import "./index.css";

function handleImageClick(name, link) {
  popupWithImage.open({ name, link });
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

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

const formValidators = {};
document
  .querySelectorAll(formValidationOptions.formSelector)
  .forEach((formElement) => {
    const formValidator = new FormValidator(formValidationOptions, formElement);
    formValidator.enableValidation();
    formValidators[formElement.getAttribute("id")] = formValidator;
  });

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-desc",
});

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues.title,
      job: inputValues.description,
    });
    profileEditPopup.close();
  },
  formValidators["edit-profile-form"]
);

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  (inputValues) => {
    const newCardData = {
      name: inputValues.title,
      link: inputValues.link,
    };
    const cardElement = createCard(newCardData);
    section.addItem(cardElement);
    addCardPopup.close();
  },
  formValidators["add-card-form"]
);

profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();

const popupWithImage = new PopupWithImage("#modal-image-display");
popupWithImage.setEventListeners();

document.getElementById("profile-edit-button").addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.getElementById("profile-title-input").value = userData.name;
  document.getElementById("profile-description-input").value = userData.job;
  profileEditPopup.open();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});
