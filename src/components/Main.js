import React from 'react';
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <div className={`loading ${props.loader && 'hide'}`}></div>
      <main className={`content ${!props.loader && 'hide'}`}>
        <section className="profile">
          <div className="profile__avatar-container">
            <img onClick={props.onEditAvatar}
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Фото профиля"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name || ''}</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button" type="button" />
            <p className="profile__description">{currentUser.about || ''}</p>
          </div>
          <button onClick={props.onAddCard} className="profile__add" type="button" />
        </section>

        <section className="elements">
          <ul className="elements_list">
            {props.cards.map(card =>
              <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              likeCounter={card.likes.length}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
            )}
          </ul>
        </section>
      </main>

      <div className="popup popup_delete">
        <div className="popup__overlay popup__overlay_delete"></div>
        <div className="popup__container">
          <button className="popup__close popup__close_delete" type="button" />
          <form className="form form_type_delete" name="imageDelete" noValidate>
            <h4 className="form__title form__title_delete">Вы уверены?</h4>
            <button type="submit" className="form__submit">Да</button>
          </form>
        </div>
      </div>
    </>
  )


}

export default Main
