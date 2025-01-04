// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
// @todo: Функция создания карточки
function createCard(card, deleteCard) {
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
}
// @todo: Функция удаления карточки
function removeCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    const cards = createCard(card, removeCard);
    placesList.append(cards);
});
