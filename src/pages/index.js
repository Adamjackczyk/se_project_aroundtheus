import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { formValidationOptions, initialCards } from "../utils/constants.js";
import Api from "../utils/Api.js";
import "./index.css";

// Initialize the API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6b68a929-d08e-4cf9-a697-37317d009dd7",
    "Content-Type": "application/json",
  },
});

function handleImageClick(name, link) {
  popupWithImage.open({ name, link });
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.generateCard();
}

function handleDeleteClick(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    return api
      .deleteCard(card._id)
      .then(() => {
        card._deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error("Failed to delete card:", err);
      });
  });
}

function handleLikeClick(card) {
  const likeAction = card._isLiked
    ? api.unlikeCard(card._id)
    : api.likeCard(card._id);

  likeAction
    .then(() => {
      card.toggleLikeButton();
    })
    .catch((err) => {
      console.error("Failed to update like status:", err);
    });
}

// Initialize the section with an empty array initially
const section = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);

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
  avatarSelector: ".profile__pic",
});

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    return api
      .setUserInfo({
        name: inputValues.title,
        about: inputValues.description,
      })
      .then((updatedUserInfo) => {
        userInfo.setUserInfo({
          name: updatedUserInfo.name,
          job: updatedUserInfo.about,
          avatar: updatedUserInfo.avatar,
        });
      });
  },
  formValidators["edit-profile-form"]
);

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  (inputValues) => {
    return api
      .addNewCard({
        name: inputValues.title,
        link: inputValues.link,
      })
      .then((newCard) => {
        const cardElement = createCard(newCard);
        section.addItem(cardElement);
      });
  },
  formValidators["add-card-form"]
);

// Popup for updating the avatar
const updateAvatarPopup = new PopupWithForm(
  "#update-avatar-modal",
  (inputValues) => {
    return api.updateUserAvatar(inputValues.avatar).then((updatedUserInfo) => {
      userInfo.setUserInfo({
        name: updatedUserInfo.name,
        job: updatedUserInfo.about,
        avatar: updatedUserInfo.avatar,
      });
    });
  },
  formValidators["update-avatar-form"]
);

// No form validation for deleteCardPopup
const deleteCardPopup = new PopupWithForm("#delete-card-modal", () => {}, null);

profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
updateAvatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();

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

document
  .querySelector(".profile__pic-container")
  .addEventListener("click", () => {
    updateAvatarPopup.open();
  });

// Fetch user info and initial cards from the server and render them
api
  .getAppInfo()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    section.renderItems(cards.reverse());

    // Upload initial cards if the server has none
    if (cards.length === 0) {
      initialCards.forEach((card) => {
        api
          .addNewCard(card)
          .then((newCard) => {
            const cardElement = createCard(newCard);
            section.addItem(cardElement);
          })
          .catch((err) => {
            console.error("Failed to upload card:", err);
          });
      });
    }
  })
  .catch((err) => {
    console.error("Failed to fetch app info:", err);
  });
