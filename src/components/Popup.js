export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.handleEscClose = this.handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (event) => {
      if (
        event.target.classList.contains("modal_opened") ||
        event.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
