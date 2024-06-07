import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
/*
 * ==============================================================================
 * Function to handle image click
 * ==============================================================================
 */
function handleImageClick(name, link) {
  const examineModalImage = document.querySelector(".modal__image");
  const examineImageLabel = document.querySelector(".modal__image-label");
  const examineImageModalDisplay = document.querySelector(
    "#modal-image-display"
  );
  examineModalImage.src = link;
  examineModalImage.alt = name;
  examineImageLabel.textContent = name;
  openPopup(examineImageModalDisplay);
}

/*
 * ==============================================================================
 * Initialize cards
 * ==============================================================================
 */

const cardListEl = document.querySelector(".cards__list");
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardListEl.append(cardElement);
});

/*
 * ==============================================================================
 * Initialize form validators
 * ==============================================================================
 */

document.querySelectorAll(options.formSelector).forEach((formElement) => {
  const formValidator = new FormValidator(options, formElement);
  formValidator.enableValidation();
});

/*
 * ==============================================================================
 * Functions to open and close popups
 * ==============================================================================
 */

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

function closeModalByEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closePopup(openedModal);
    }
  }
}

/*
 * ==============================================================================
 * Event listeners for opening and closing modals
 * ==============================================================================
 */

const profileEditBtn = document.getElementById("profile-edit-button");
const profileExitBtn = document.getElementById("profile-exit-button");
const profileEditModal = document.getElementById("profile-edit-modal");
const profileEditTitle = document.getElementById("profile-title");
const profileEditDescription = document.getElementById("profile-desc");
const profileEditTitleInput = document.getElementById("profile-title-input");
const profileEditDescriptionInput = document.getElementById(
  "profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.getElementById("add-card-modal");
const addCardForm = document.getElementById("add-card-form");
const addCardTitleInput = document.getElementById("card-title-input");
const addCardLinkInput = document.getElementById("card-link-input");
const addCardExitBtn = document.getElementById("add-card-exit-button");

const examineImageCloseButton = document.querySelector(
  "#modal-image-close-button"
);

/*
 * ==============================================================================
 * Event listener for opening the profile edit modal
 * ==============================================================================
 */

profileEditBtn.addEventListener("click", () => {
  profileEditTitleInput.value = profileEditTitle.textContent;
  profileEditDescriptionInput.value = profileEditDescription.textContent;
  openPopup(profileEditModal);
});

/*
 * ==============================================================================
 * Event listener for closing the profile edit modal
 * ==============================================================================
 */

profileExitBtn.addEventListener("click", () => closePopup(profileEditModal));
profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileEditTitle.textContent = profileEditTitleInput.value;
  profileEditDescription.textContent = profileEditDescriptionInput.value;
  closePopup(profileEditModal);
});

/*
 * ==============================================================================
 * Event listener for opening the add card modal
 * ==============================================================================
 */

addCardBtn.addEventListener("click", () => openPopup(addCardModal));

/*
 * ==============================================================================
 * Event listener for closing the add card modal
 * ==============================================================================
 */

addCardExitBtn.addEventListener("click", () => closePopup(addCardModal));
addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCardData = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  const card = new Card(newCardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardListEl.prepend(cardElement);
  addCardTitleInput.value = "";
  addCardLinkInput.value = "";
  closePopup(addCardModal);
});

/*
 * ==============================================================================
 * Event listener for closing the image modal
 * ==============================================================================
 */

examineImageCloseButton.addEventListener("click", () =>
  closePopup(document.querySelector("#modal-image-display"))
);

/*
 * ==============================================================================
 * Close modals by clicking outside the content
 * ==============================================================================
 */

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
  });
});
