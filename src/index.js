
import { createCard as DOMCreateCard } from './components/card';
import './pages/index.css';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import {
  getInitialCards as APIGetInitialCards,
  createCard as APICreateCard,
  deleteCard as APIDeleteCard,
  likeCard as APILikeCard,
  unLikeCard as APIUnLikeCard,
  getUserInfo as APIGetUserInfo,
  updateUserInfo as APIUpdateUserInfo,
  updateUserAvatar as APIUpdateUserAvatar
} from './components/api';
import { error } from 'jquery';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const allPopups = document.querySelectorAll('.popup');

const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
const placeForm = document.forms['new-place'];
const placeFormSubmitButton = placeForm.querySelector('popup__button');
const placeName = placeForm['place-name'];
const placeLink = placeForm['link'];

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');

const profileImageForm = document.forms['edit-avatar'];
const profileImageInput = profileImageForm['avatar'];
const profileImageFormSubmitButton = profileImageForm.querySelector('.popup__button');
const popupProfileImage = document.querySelector('.popup_type_edit-avatar');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const editName = profileForm['name'];
const editDescription = profileForm['description'];

const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonEdit = document.querySelector('.profile__edit-button');

const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');

const setProfile = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
};

const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains('card__like-button_is-active')){
    APIUnLikeCard(cardId)
    .then(({ likes }) => {
      buttonElement.classList.remove('card__like-button_is-active');

      if (likes.lenght) {
        counterElement.classList.add('card__like-counter_is-active');
        counterElement.textContent = likes.lenght;
      } else {
        counterElement.classList.remove('card__like-counter_is-active');
        counterElement.textContent = '';
      }
    })
    .catch((error) => console.error(error))
    .finally(() => {
      buttonElement.disabled = false;
    });
  } else {
    APILikeCard(cardId)
    .then(({ likes }) => {
      buttonElement.classList.add('card__like-button_is-active');
      counterElement.classList.add('card__like-counter_is-active');
      counterElement.textContent = likes.lenght;
    })
    .catch((error) => console.error(error))
    .finally(() => {
      buttonElement.disabled = false;
    });
  }
};

const handleCardDelete = ({ cardId, buttonElement }) => {
  openModal(popupConfirm);
  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    APIDeleteCard(cardId)
    .then(() => {
      buttonElement.closest('.card').remove();
      closeModal(popupConfirm);
    })
    .catch((error) => {
      buttonElement.disabled = false;
      console.error(error);
    });
  };
};


// Добавление карточки пользователем
function addUserCard(evt) {
  evt.preventDefault();

  renderLoading({
    buttonElement: placeFormSubmitButton,
    isLoading: true,
  });

  APICreateCard({
    name: placeName.value,
    link: placeLink.value
  })
  .then((cardData) => {
    placesList.prepend(
      DOMCreateCard({
        currentUserId: cardData.owner['_id'],
        template: cardTemplate,
        data: cardData,
        deleteCard: handleCardDelete,
        likeCard: handleCardLike,
        onImageClick: openCardClick,
      })
    );

    placeForm.reset();
    closeModal(popupTypeNewCard);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    renderLoading({
      buttonElement: placeFormSubmitButton,
      isLoading: false
    });
  });
};
placeForm.addEventListener('submit', addUserCard);

// Редактирование профиля
function editProfileFormSubmit(evt) {
  evt.preventDefault();

  renderLoading({
    buttonElement: profileFormSubmitButton,
    isLoading: true,
  });
  APIUpdateUserInfo({
    name: editName.value,
    description: editDescription.value
  })
  .then(({ name, about, avatar }) => {
    setProfile({
      name,
      description: about,
      avatar
    });
    closeModal(popupTypeEdit);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    renderLoading({
      buttonElement: profileFormSubmitButton,
      isLoading: false
    });
  });
};
profileForm.addEventListener('submit', editProfileFormSubmit);

function editProfileImageSubmit(evt) {
  evt.preventDefault();

  renderLoading({
    buttonElement: profileImageFormSubmitButton,
    isLoading: true,
  });
  APIUpdateUserAvatar(profileImageInput.value)
  .then(({ name, about, avatar }) => {
    setProfile({
      name,
      description: about,
      avatar
    });
    closeModal(popupProfileImage);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    renderLoading({
      buttonElement:profileImageFormSubmitButton,
      isLoading: false
    });
  });
};
profileImageForm.add('sumbit', editProfileImageSubmit);


buttonEdit.addEventListener('click', () => {
  const popupForm = popupTypeEdit.querySelector(validationConfig.formSelector);

  clearValidation(popupForm, validationConfig);

  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

buttonAdd.addEventListener('click', () => {
  const popupForm = popupTypeNewCard.querySelector(validationConfig.formSelector);
  clearValidation(popupForm, validationConfig);
  openModal(popupTypeNewCard);
});

popupProfileImage.addEventListener('click', () => {
  const popupForm = popupProfileImage.querySelector(validationConfig.formSelector);
  clearValidation(popupForm, validationConfig);
  openModal(popupProfileImage);
})

// Обработчик оверлея и крестика

allPopups.forEach(function (popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    };
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    };
  });
}); // Перенести в модал жс

// Открытие картинки
const openCardClick = ({ cardLink, cardName }) => {
  popupImageCaption.textContent = cardName;
  popupImage.alt = cardName;
  popupImage.src = cardLink;
  openModal(popupTypeImage);
};

enableValidation(validationConfig);
