import { initialCards } from '../src/scripts/cards';
import { createCard, removeCard, likeCard } from './components/card';
import './pages/index.css';
import { openModal, closeModal } from './components/modal';

const placesList = document.querySelector('.places__list');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

buttonEdit.addEventListener('click', () => {
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});
buttonAdd.addEventListener('click', () => {
  openModal(popupTypeNewCard);
});

// Обработчик оверлея и крестика
const allPopups = document.querySelectorAll('.popup');

allPopups.forEach(function (popup) {
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
const openCardClick = ({ cardLink, cardName }) => {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupImageCaption = document.querySelector('.popup__caption');
  popupImageCaption.textContent = cardName;
  popupImage.alt = cardName;
  popupImage.src = cardLink;
  openModal(popupTypeImage);
};

// Вывести карточки на страницу
initialCards.forEach(card => {
  const cards = createCard(card, removeCard, openCardClick, likeCard, addUserCard);
  placesList.append(cards);
});

// Редактирование профиля
const profileForm = document.forms['edit-profile'];
const editName = profileForm['name'];
const editDescription = profileForm['description'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = editName.value;
  const aboutValue = editDescription.value;
  profileName.textContent = nameValue;
  profileDescription.textContent = aboutValue;

  closeModal(popupTypeEdit);
};

profileForm.addEventListener('submit', handleFormSubmit);

// Добавление карточки пользователем
const placeForm = document.forms['new-place'];
const placeName = placeForm['place-name'];
const placeLink = placeForm['link'];

function addUserCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeName.value,
    link: placeLink.value
  };

  placesList.prepend(createCard(newCard, removeCard, openCardClick, likeCard));
  placeForm.reset();
  closeModal(popupTypeNewCard);
};

placeForm.addEventListener('submit', addUserCard);




