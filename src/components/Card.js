import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [liked, setLiked] = React.useState(
    props.card.likes.some((i) => i._id === currentUser._id)
  );
  const isOwn = props.card.owner._id === currentUser._id;


  function handleClick() {
    props.onCardClick(props.card);
  }

  function likeClick() {
    setLiked(!liked);
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="element">
      <div className="element__image-container">
        <img
          onClick={handleClick}
          className="element__image"
          src={props.card.link}
          alt={props.card.name}
        ></img>
      </div>
      <button
        onClick={handleDeleteClick}
        className={`element__trash ${isOwn ? "element__trash_active" : ""}`}
        type="button"
      />
      <div className="element__text-box">
        <h4 className="element__name">{props.card.name}</h4>
        <div className="element__like-box">
          <button
            onClick={likeClick}
            className={`element__like ${liked && "element__like_active"}`}
            type="button"
          />
          <p className="element__likes">{props.likeCounter}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
