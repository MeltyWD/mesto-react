import "../pages/index.css";

import { initialCards as items, validationSetting } from "./utils/initial.js";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js.js";
import PopupWithImage from "../components/PopupWithImage.js.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js.js";
import UserInfo from "../components/UserInfo.js.js";
import Api from "../components/Api.js.js";

const popupProfileEditOpenButton = document.querySelector(
  ".profile__edit-button"
);
const popupProfileEdit = document.querySelector(".popup_profile-edit");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

const popupAddCard = document.querySelector(".popup_image-add");
const popupCardAddOpenButton = document.querySelector(".profile__add");

const elementsList = document.querySelector(".elements_list");
const popupImage = document.querySelector(".popup_image");

const popupImageDelete = document.querySelector(".popup_delete");
const popupAvatarEdit = document.querySelector(".popup_avatar")

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16/",
  headers: "91120ba6-b1f5-4198-9100-ce071631590f",
});

// Переменная для хранения id пользователя
let profileId

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then((result) => {
    const userInfoObj = result[0];
    profileId = result[0]._id;
    userInfo.setUserInfo(userInfoObj);
    userInfo.setUserAvatar(userInfoObj);
    section.renderer(result[1]);
  })
  .catch((err) => console.log(err));

// Функция для открытия попапа карточек
const handleCardClick = (evt) => {
  const data = {
    image: evt.target.src,
    text: evt.target.closest(".element").querySelector(".element__name")
      .textContent,
  };
  popupWithImage.open(data);
};

// Функция удаления карточки
const handleTrashCardClick = (data) => {
  popupDeleteImage.data = data
  popupDeleteImage.open()
};

// переменные для функций лайка
let handleLikeCardClick, handleDeleteLikeCardClick;

// Функция создания экземпляра карточки
const cardRender = (data) => {
  const card = new Card(
    data,
    "#elementTemplate",
    handleCardClick,
    handleTrashCardClick,
    handleLikeCardClick = (data) => {
      return api.likeCard(data)
    },
    handleDeleteLikeCardClick = (data) => {
      return api.deleteCardLike(data)
    },
    data.owner._id,
    profileId
  );
  const cardElement = card.createCardElement(data);
  return cardElement;
};

// Класс отрисовки карточек на странице
const section = new Section(
  {
    renderer: (data) => {
      section.addItem(cardRender(data));
    },
  },
  elementsList
);

// Класс попапа карточек
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

// Класс попапа редактирования профиля
const userInfo = new UserInfo({
  profileName,
  profileDescription,
  profileAvatar,
});
const popupProfileEditWithForm = new PopupWithForm(popupProfileEdit, {
  formSubmitHandler: (data, button) => {
    button.textContent = 'Сохранение...';
    api
      .patchProfileEdit(data)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupProfileEditWithForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        button.textContent = 'Сохранить';
      })
  },
});
popupProfileEditWithForm.setEventListeners();

// Класс попапа добавления карточек
const popupAddCardWithForm = new PopupWithForm(popupAddCard, {
  formSubmitHandler: (data, button) => {
    button.textContent = 'Создаем...';
    const item = {
      name: data.image_name,
      link: data.image_source
    };
    api
      .postNewCard(item)
      .then((result) => {
        section.addItem(cardRender(result), true);
        popupAddCardWithForm.close();
        popupAddCardValidation.toggleButtonState();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        button.textContent = 'Создать';
      })
  },
});
popupAddCardWithForm.setEventListeners();

// Класс попапа удаления карточек
const popupDeleteImage = new PopupConfirm(popupImageDelete, {
  formSubmitHandler: (data) => {
    api
      .deleteCard(data.itemId)
      .then(() => {
        data.item.remove();
        popupDeleteImage.close()
      })
      .catch((err) => console.log(err))
  }
});
popupDeleteImage.setEventListeners();

// Класс попапа редактирования аватарки
const popupAvatarEditWithForm = new PopupWithForm(popupAvatarEdit, {
  formSubmitHandler: (data, button) => {
    button.textContent = 'Сохранение...';
    api
      .avatarEdit(data)
      .then((result) => {
        userInfo.setUserAvatar(result);
        popupAvatarEditWithForm.close();
        popupAvatarEditValidation.toggleButtonState();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        button.textContent = 'Сохранить';
      })
  }
});
popupAvatarEditWithForm.setEventListeners();

// // Инициализируем валидацию форм
const popupProfileEditValidation = new FormValidator(
  popupProfileEdit,
  validationSetting
);
popupProfileEditValidation.enableValidation();
const popupAddCardValidation = new FormValidator(
  popupAddCard,
  validationSetting
);
popupAddCardValidation.enableValidation();
const popupAvatarEditValidation = new FormValidator(
  popupAvatarEdit,
  validationSetting
);
popupAvatarEditValidation.enableValidation();

// Добавление слушателей на кнопки
popupProfileEditOpenButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  document.forms.profileEdit.name.value = data.name;
  document.forms.profileEdit.description.value = data.description;
  popupProfileEditValidation.openCheckValidity();
  popupProfileEditWithForm.open();
  popupProfileEditOpenButton.blur();
});
popupCardAddOpenButton.addEventListener("click", () => {
  popupAddCardWithForm.open();
  popupCardAddOpenButton.blur();
});
profileAvatar.addEventListener('click', () => popupAvatarEditWithForm.open())
