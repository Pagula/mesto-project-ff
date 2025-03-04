const createCard = ({
  currentUserId,
  template,
  data,
  deleteCard,
  onImageClick,
  likeCard
}) => {

  const element = template.querySelector('.card').cloneNode(true);

  const cardImage = element.querySelector('.card__image');
  cardImage.addEventListener('click', () =>
    onImageClick({
      cardName: data.name,
      cardLink: data.link,
    })
  );
  cardImage.src = data.link;
  cardImage.alt = data.name;

  element.querySelector('.card__title').textContent = data.name;

  const counter = element.querySelector('.card__like-counter');

  if (data.likes.lenght) {
    counter.classList.add('card__like-counter_is-active');
    counter.textContent = data.likes.lenght;
  }

  const deleteButton = element.querySelector('.card__delete-button');

  if (data.owner['_id'] === currentUserId) {
    deleteButton.classList.add('card__delete-button_is-active');
    deleteButton.addEventListener('click', () => {
      deleteCard({
        cardId: data['_id'],
        cardElement: element,
        buttonElement: deleteButton
      });
    });
  }

  const likeButton = cardElement.querySelector('.card__like-button');

  if (data.likes.find((element) => element['_id'] === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    likeCard({
      cardId: data['_id'],
      buttonElement: likeButton,
      counterElement: counter
    });
  });

  return element;
};

export { createCard }
