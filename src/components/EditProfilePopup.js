import PopupWithForm from './PopupWithForm.js'
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [buttonText, setButtonText] = React.useState('Сохранить');

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleAboutChange(e) {
    setAbout(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Загрузка...')
    props.onUpdateUser({name, about})
      .then(() => props.onClose())
      .finally(() => {
        setButtonText('Сохранить')
      })
  }

  React.useEffect(() => {
    if(props.isOpen === true) {
      setName(currentUser.name)
      setAbout(currentUser.about)
    }// eslint-disable-next-line
  }, [props.isOpen])

  return (
<PopupWithForm
  name="edit-profile"
  title="Редактировать профиль"
  submitText={buttonText}
  isOpen={props.isOpen}
  onClose={props.onClose}
  onSubmit={handleSubmit}
>
  <label className="form__field">
    <input
      className="form__input popup__input-text_type_name"
      type="text"
      name="name"
      id="name-input"
      minLength="2" maxLength="40"
      value={name}
      onChange={handleNameChange}
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
      value={about}
      onChange={handleAboutChange}
      required
      />
    <span className="form__input-error" id="description-input-error"></span>
  </label>
</PopupWithForm>
  )
}

export default EditProfilePopup;
