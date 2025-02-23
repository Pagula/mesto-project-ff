import { closeModal } from "./modal";

export function createCard(card, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;

  deleteButton.addEventListener('click', () => {
      deleteCard(cardElement);
  });

  return cardElement;
};

// @todo: Функция удаления карточки
export function removeCard(cardElement) {
  cardElement.remove();
};

export function addUserCard (evt) {
  evt.preventDefault();
  const placeName = document.forms.newPlace.placeName;
  const placeLink = document.forms.newPlace.Link;
  placeList.prepend(createCard(placeLink.value, placeName.value, removeCard));
  placeForm.reset();
  closeModal();
}
