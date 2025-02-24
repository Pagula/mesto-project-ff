function createCard(card, deleteCard, onImageClick, likedCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.addEventListener('click', () =>
    onImageClick({
      cardLink: card.link,
      cardName: card.name,
    })
  );
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;

  likeButton.addEventListener('click', () => {
    likedCard(likeButton);
  });

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;
};

// Функция лайка карточки
function likedCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
};

export { createCard, removeCard, likedCard }
