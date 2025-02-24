import {initialCards} from '../src/scripts/cards';
import { createCard, removeCard, addUserCard} from './components/card';
import './pages/index.css';
import { openModal, closeModal } from './components/modal';

const placesList = document.querySelector('.places__list');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

buttonEdit.addEventListener('click', () => {
  openModal(popupTypeEdit);
});
buttonAdd.addEventListener('click', () => {
  openModal(popupTypeNewCard);
});

const allPopups = document.querySelectorAll('.popup');

// Обработчик оверлея и крестика
allPopups.forEach( function (popup) {
    popup.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(popup);
        };
        if (evt.target.classList.contains('popup__close')) {
            closeModal(popup);
        };
    });
});


// Открытие картинки
const openCardClick = ( {cardLink, cardName} ) => {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupImageCaption = document.querySelector('.popup__caption');
  popupImageCaption.textContent = cardName;
  popupImage.alt = cardName;
  popupImage.src = cardLink;
  openModal(popupTypeImage);
};

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');



// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const cards = createCard(card, removeCard, openCardClick);
  placesList.append(cards);
});
