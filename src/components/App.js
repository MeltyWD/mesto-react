import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'

import headerImage from '../images/header/logo.svg'
import profileImage from '../images/profile/image.jpg'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpenClose] = React.useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpenClose] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenClose] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');

  function clickEditProfilePopupOpenClose() {
    setEditProfilePopupOpenClose(!isEditProfilePopupOpen);
  };
  function clickAddCardPopupOpenClose() {
    setAddCardPopupOpenClose(!isAddCardPopupOpen);
  };
  function clickEditAvatarPopupOpenClose() {
    setEditAvatarPopupOpenClose(!isEditAvatarPopupOpen);
  };

  function clickImagePopupOpen(card) {
    setSelectedCard(card);
  }

  function closeImagePopup() {
    setSelectedCard('');
  }


  return (
    <div className="root">
      <Header headerImage={headerImage} />
      <Main
        profileImage={profileImage}
        onEditProfile={clickEditProfilePopupOpenClose}
        onAddCard={clickAddCardPopupOpenClose}
        onEditAvatar={clickEditAvatarPopupOpenClose}
        onCardClick={clickImagePopupOpen}
      />
      <Footer />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        submitText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={clickEditProfilePopupOpenClose}
      >
        <label className="form__field">
          <input
            className="form__input popup__input-text_type_name"
            type="text"
            name="name"
            id="name-input"
            minLength="2" maxLength="40"
            required
            />
          <span className="form__input-error" id="name-input-error"></span>
        </label>
        <label className="form__field">
          <input
            className="form__input popup__input-text_type_description"
            type="text" name="description"
            id="description-input"
            minLength="2" maxLength="200"
            required
            />
          <span className="form__input-error" id="description-input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="cardAdd"
        title="Новое место"
        submitText="Создать"
        isOpen={isAddCardPopupOpen}
        onClose={clickAddCardPopupOpenClose}
      >
        <label className="form__field">
          <input
            type="text"
            className="form__input popup__input-text_type_image-name"
            id="image-name-input"
            name="image_name"
            placeholder="Название"
            minLength="1"
            maxLength="30"
            required
          />
          <span className="form__input-error" id="image-name-input-error"></span>
        </label>
        <label className="form__field">
          <input
            type="url"
            className="form__input popup__input-text_type_image-source"
            id="image-source-input"
            name="image_source"
            placeholder="Ссылка на картинку"
            required
          />
          <span
            className="form__input-error"
            id="image-source-input-error"
          ></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="avatarEdit"
        title="Обновить аватар"
        submitText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={clickEditAvatarPopupOpenClose}
      >
        <label className="form__field">
          <input
            type="url"
            className="form__input popup__input-text_type_image-source"
            id="image-source-input"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span
            className="form__input-error"
            id="image-source-input-error"
          ></span>
        </label>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeImagePopup}
      />
    </div>
  );
}

export default App;
