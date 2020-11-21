import PopupWithForm from './PopupWithForm.js'
import React from 'react';

function EditAvatarPopup(props) {
  const [buttonText, setButtonText] = React.useState('Сохранить');
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Загрузка...')
    props.onUpdateAvatar({avatar: avatarRef.current.value})
      .then(() => {
        handleClosePopup();
      })
      .finally(() => {
        setButtonText('Сохранить')
      })
  }

  function handleClosePopup() {
    props.onClose()
    setTimeout(() => avatarRef.current.value = '', 200)
  }

  return (
    <PopupWithForm
        name="avatarEdit"
        title="Обновить аватар"
        submitText={buttonText}
        isOpen={props.isOpen}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
      >
        <label className="form__field">
          <input
            ref={avatarRef}
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
  )
}

export default EditAvatarPopup;
