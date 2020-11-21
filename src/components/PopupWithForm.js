function PopupWithForm(props) {
  return (
      <div className={`popup ${props.isOpen && 'popup_opened'}`} id={props.name}>
        <div onClick={props.onClose} className="popup__overlay"></div>
        <div className="popup__container">
          <button onClick={props.onClose} className="popup__close popup__close_edit" type="button" />
          <form onSubmit={props.onSubmit} className="form" name={props.name} noValidate>
            <h2 className="form__title">{props.title}</h2>
            {props.children}
            <button type="submit" className="form__submit">{props.submitText}</button>
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm;
