function createCard(card, deleteCard, onImageClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardImage.addEventListener('click', () => onImageClick(card.name, card.link));

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', () => {
      deleteCard(cardElement);
  });

  return cardElement;
};

// @todo: Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
};


export { createCard, removeCard }
