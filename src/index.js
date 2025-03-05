
import { createCard as DOMCreateCard } from './components/card';
import './pages/index.css';
import { openModal, closeModal, handleModalClick } from './components/modal';
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

const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
const cardForm = document.forms['new-place'];
const cardFormSubmitButton = cardForm.querySelector('.popup__button');
const cardName = cardForm['place-name'];
const cardLink = cardForm['link'];

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupCardButtonOpen = document.querySelector('.profile__add-button');

const profileImageForm = document.forms['edit-avatar'];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton = profileImageForm.querySelector('.popup__button');
const popupProfileImage = document.querySelector('.popup_type_edit-avatar');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const profileNameInput = profileForm['name'];
const profileDescriptionInput = profileForm['description'];

const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');

const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');

const setProfile = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const renderLoading = ({ buttonElement, isLoading }) => {
  if (!buttonElement) {
    console.error('Элемент кнопки не найден!');
    return;
  }
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
};

const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains('card__like-button_is-active')) {
    APIUnLikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.remove('card__like-button_is-active');

        if (likes.length) {
          counterElement.classList.add('card__like-counter_is-active');
          counterElement.textContent = likes.length;
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
        counterElement.textContent = likes.length;
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
const addUserCard = (evt) => {
  evt.preventDefault();

  renderLoading({
    buttonElement: cardFormSubmitButton,
    isLoading: true,
  });

  APICreateCard({
    name: cardName.value,
    link: cardLink.value
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

      cardForm.reset();
      closeModal(popupTypeNewCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: cardFormSubmitButton,
        isLoading: false
      });
    });
};

// Редактирование профиля
const editProfileFormSubmit = (evt) => {
  evt.preventDefault();

  renderLoading({
    buttonElement: profileFormSubmitButton,
    isLoading: true,
  });
  APIUpdateUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value
  })
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar
      });
      closeModal(popupProfile);
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

const editProfileImageSubmitForm = (evt) => {
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
        buttonElement: profileImageFormSubmitButton,
        isLoading: false
      });
    });
};

// Открытие картинки
const openCardClick = ({ cardLink, cardName }) => {
  popupImageCaption.textContent = cardName;
  popupImage.alt = cardName;
  popupImage.src = cardLink;
  openModal(popupTypeImage);
};

const handlePopupProfileButtonOpenClick = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(popupProfile);
};

const handlePopupCardButtonOpenClick = () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  openModal(popupTypeNewCard);
};

const handleProfileImageClick = () => {
  profileImageForm.reset();
  clearValidation(profileImageForm, validationConfig);
  openModal(popupProfileImage);
};

popupTypeImage.addEventListener('click', handleModalClick);
popupProfile.addEventListener('click', handleModalClick);
popupProfileImage.addEventListener('click', handleModalClick);
popupConfirm.addEventListener('click', handleModalClick);

popupTypeNewCard.addEventListener('click', handleModalClick);
popupCardButtonOpen.addEventListener('click', handlePopupCardButtonOpenClick);

profileImage.addEventListener('click', handleProfileImageClick);
popupProfileButtonOpen.addEventListener('click', handlePopupProfileButtonOpenClick);

profileImageForm.addEventListener('submit', editProfileImageSubmitForm);
profileForm.addEventListener('submit', editProfileFormSubmit);
cardForm.addEventListener('submit', addUserCard);

enableValidation(validationConfig);

Promise.all([APIGetUserInfo(), APIGetInitialCards()])
  .then(([{ name, about, avatar, ['_id']: currentUserId }, cardsData]) => {
    setProfile({
      name,
      description: about,
      avatar
    });

    cardsData.forEach((cardData) => {
      placesList.append(
        DOMCreateCard({
          currentUserId,
          template: cardTemplate,
          data: cardData,
          deleteCard: handleCardDelete,
          likeCard: handleCardLike,
          onImageClick: openCardClick
        })
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
