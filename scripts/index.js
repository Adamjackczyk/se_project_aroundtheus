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

/*
 * ==============================================================================
 * Elements
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
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.getElementById("card-template").content.firstElementChild;

const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.getElementById("add-card-modal");
const addCardForm = document.getElementById("add-card-form");
const addCardTitleInput = document.getElementById("card-title-input");
const addCardLinkInput = document.getElementById("card-link-input");
const addCardExitBtn = document.getElementById("add-card-exit-button");

const examineImageModalDisplay = document.querySelector("#modal-image-display");
const examineModalImage = document.querySelector(".modal__image");
const examineImageLabel = document.querySelector(".modal__image-label");
const examineImageCloseButton = examineImageModalDisplay.querySelector(
  "#modal-image-close-button"
);

/*
 * ==============================================================================
 * Functions
 * ==============================================================================
 */

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardImageEl.addEventListener("click", () => {
    examineModalImage.src = cardData.link;
    examineModalImage.alt = cardData.name;
    examineImageLabel.textContent = cardData.name;
    openPopup(examineImageModalDisplay);
  });

  return cardElement;
}

/*
 * ==============================================================================
 * Event Handlers
 * ==============================================================================
 */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileEditTitle.textContent = profileEditTitleInput.value;
  profileEditDescription.textContent = profileEditDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const newCardData = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  const cardElement = getCardElement(newCardData);
  cardListEl.prepend(cardElement);

  addCardTitleInput.value = "";
  addCardLinkInput.value = "";

  closePopup(addCardModal);
}

/*
 * ==============================================================================
 * Event Listeners
 * ==============================================================================
 */

profileEditBtn.addEventListener("click", () => {
  profileEditTitleInput.value = profileEditTitle.textContent;
  profileEditDescriptionInput.value = profileEditDescription.textContent;
  openPopup(profileEditModal);
});

profileExitBtn.addEventListener("click", () => closePopup(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardBtn.addEventListener("click", () => openPopup(addCardModal));
addCardExitBtn.addEventListener("click", () => closePopup(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

examineImageCloseButton.addEventListener("click", () =>
  closePopup(examineImageModalDisplay)
);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
