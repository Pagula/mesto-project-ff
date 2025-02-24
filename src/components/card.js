function createCard(card, deleteCard, onImageClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = element.querySelector('.card__like-button');

  cardImage.alt = card.name;
  cardImage.src = card.link;


  cardImage.addEventListener('click', () =>
    onImageClick({
      cardLink: card.link,
      cardName: card.name,
      })
  );

  cardElement.querySelector('.card__title').textContent = card.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;
};



// Функция лайка карточки
function likeCard(evt) {

}


// Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
};


export { createCard, removeCard }
