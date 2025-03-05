  // функция открытия попапа
const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleDocumentKeydown);
}

  // функция для закрытия попапа
const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleDocumentKeydown);
}

const handleModalClick = (evt) => {
  if (evt.target.classList.contains('popup_is-opened')) {
    return closeModal(evt.target);
    }
  if (evt.target.classList.contains('popup__close')) {
    closeModal(evt.target.closest('.popup'));
  }
};

// Закрытие попапа по клавише Esc
const handleDocumentKeydown = (evt) => {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
export { openModal, closeModal, handleModalClick };
