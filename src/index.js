import "./pages/index.css";
import {
  addNewCardApi,
  editUserDataApi,
  getInitialsCardsApi,
  getUserDataApi,
  updateAvatarApi,
} from "./components/api.js";
import { createCard, deleteCard, setLikeToCard } from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import "./pages/index.css";

// DOM элементы
const placesContainer = document.querySelector(".places__list");
const closePopupButtons = document.querySelectorAll(".popup__close");

const newCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = addCardForm.querySelector(".popup__input_type_url");
const profileAddButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const userNameInput = editProfileForm.querySelector(".popup__input_type_name");
const userDescriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");

const editAvatarPopup = document.querySelector(".popup_type_avatar");
const editAvatarForm = document.querySelector(
  '.popup__form[name="edit-avatar"]'
);
const avatarUrlInput = editAvatarForm.querySelector(
  ".popup__input_type_avatar"
);
const profileAvatar = document.querySelector(".profile__image");

const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaptionElement = popupImage.querySelector(".popup__caption");
let currentUserId = null;

// Конфигурация валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Обработчики открытия попапов
profileEditButton.addEventListener("click", () => {
  userNameInput.value = profileTitle.textContent;
  userDescriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openPopup(editProfilePopup);
});

profileAddButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openPopup(newCardPopup);
});

profileAvatar.addEventListener("click", () => {
  editAvatarForm.reset();
  clearValidation(editAvatarForm, validationConfig);
  openPopup(editAvatarPopup);
});

// Обработчики закрытия попапов
closePopupButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    if (popup) {
      closePopup(popup);
    }
  });
});

// Обработчик отправки формы редактирования профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, editProfileForm);

  const nameValue = userNameInput.value;
  const jobValue = userDescriptionInput.value;

  editUserDataApi(nameValue, jobValue)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, editProfileForm);
    });
}

// Обработчик отправки формы добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, addCardForm);

  const cardName = cardNameInput.value;
  const imageUrl = cardUrlInput.value;

  addNewCardApi(cardName, imageUrl)
    .then((card) => {
      const newCard = createCard(
        card._id,
        card.name,
        card.link, 
        deleteCard,
        card.likes,
        setLikeToCard,
        openImagePopup,
        card.owner._id,
        currentUserId
      );
      addCard(newCard, true);
      addCardForm.reset();
      closePopup(newCardPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      renderLoading(false, addCardForm);
    });
}

// Обработчик отправки формы обновления аватара
function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, editAvatarForm);
  const avatarUrl = avatarUrlInput.value;
  updateAvatarApi(avatarUrl)
    .then((avatar) => {
      profileAvatar.style.backgroundImage = `url(${avatar.avatar})`;
      editAvatarForm.reset();
      closePopup(editAvatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, editAvatarForm);
    });
}

// Открытие попапа с изображением
function openImagePopup(imageSrc, caption) {
  popupImageElement.src = imageSrc;
  popupImageElement.alt = caption;
  popupCaptionElement.textContent = caption;

  openPopup(popupImage);
}

// Добавление карточки в DOM
function addCard(cardElement, toStart) {
  if (toStart) {
    placesContainer.prepend(cardElement);
  } else {
    placesContainer.append(cardElement);
  }
}

// Загрузка начальных данных
Promise.all([getUserDataApi(), getInitialsCardsApi()])
  .then(([userData, initialCards]) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    // Создание и добавление карточек
    initialCards.forEach((card) => {
      const newCard = createCard(
        card._id,
        card.name,
        card.link,
        deleteCard,
        card.likes,
        setLikeToCard,
        openImagePopup,
        card.owner._id,
        currentUserId
      );
      addCard(newCard);
    });
  })
  .catch((error) => console.log(error));

// Функция отображения состояния загрузки
const renderLoading = (isLoading, formElement) => {
  const buttonElement = formElement.querySelector(".popup__button");
  if (isLoading) {
    buttonElement.setAttribute("data-text", buttonElement.textContent);
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = buttonElement.getAttribute("data-text");
    buttonElement.removeAttribute("data-text");
  }
};

// Назначение обработчиков событий
editProfileForm.addEventListener("submit", handleProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
editAvatarForm.addEventListener("submit", handleEditAvatarSubmit);
enableValidation(validationConfig);
