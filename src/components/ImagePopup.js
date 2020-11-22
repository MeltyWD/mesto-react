function ImagePopup(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} id={props.name}>
      <div onClick={props.onClose} className="popup__overlay popup__overlay_image"></div>
      <div className="popup__container popup__container_image">
        <button onClick={props.onClose} className="popup__close popup__close_image" type="button" />
        <img className="popup__image" src={`${props.card.link}`} alt={props.card.name} />
        <p className="popup__image-text">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
