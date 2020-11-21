import PopupWithForm from './PopupWithForm.js'
import React from 'react';

function AddPlacePopup(props) {
  const [buttonText, setButtonText] = React.useState('Создать');
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleClosePopup() {
    props.onClose()
    setTimeout(() => {
      setName('');
      setLink('');
    }, 200)
  }

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Создаем...')
    props.onAddPlace({name, link})
      .then(() => handleClosePopup())
      .finally(() => {
        setButtonText('Создать')
      })
  }

  return (
    <PopupWithForm
      name="cardAdd"
      title="Новое место"
      submitText={buttonText}
      isOpen={props.isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
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
          onChange={handleNameChange}
          value={name}
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
          onChange={handleLinkChange}
          value={link}
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

export default AddPlacePopup;
