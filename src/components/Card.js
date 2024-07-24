export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this.name = data.name;
    this.link = data.link;
    this.id = data._id;
    this.cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
    this.isLiked = data.isLiked || false;
  }

  // Get the card template from the DOM and clone it
  getTemplate() {
    const cardElement = document
      .querySelector(this.cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Set up event listeners for the card
  setEventListeners() {
    this.cardImageElement.addEventListener("click", () => {
      this.handleImageClick(this.name, this.link);
    });

    this.cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this.handleLikeClick(this);
      });

    this.cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.handleDeleteClick(this);
      });
  }

  // Toggle the like button's active state
  toggleLikeButton() {
    this.isLiked = !this.isLiked;
    this.cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  // Remove the card from the DOM
  deleteCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  // Generate the card element and set up event listeners
  generateCard() {
    this.cardElement = this.getTemplate();
    this.cardImageElement = this.cardElement.querySelector(".card__image");
    this.cardElement.querySelector(".card__title").textContent = this.name;
    this.cardImageElement.src = this.link;
    this.cardImageElement.alt = this.name;

    if (this.isLiked) {
      this.cardElement
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    }

    this.setEventListeners();

    return this.cardElement;
  }
}
