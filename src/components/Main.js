import React from 'react';
import api from '../utils/Api.js';
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription  , setUserDescription] = React.useState("Исследователь океана");
  const [userAvatar, setUserAvatar] = React.useState(props.profileImage);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then((result) => {
        const [userData, cardList] = result;
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar)
        setCards(cardList)
      })
      .catch((err) => console.log(err));
  }, [])

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img onClick={props.onEditAvatar}
            className="profile__avatar"
            src={userAvatar}
            alt="Фото профиля"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button" type="button" />
            <p className="profile__description">{userDescription}</p>
          </div>
          <button onClick={props.onAddCard} className="profile__add" type="button" />
        </section>

        <section className="elements">
          <ul className="elements_list">
            {cards.map(card =>
              <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              likeCounter={card.likes.length}
            />
            )}
          </ul>
        </section>
      </main>

      <div className="popup popup_image">
        <div className="popup__overlay popup__overlay_image"></div>
        <div className="popup__container popup__container_image">
          <button className="popup__close popup__close_image" type="button" />
          <img className="popup__image" src="#" alt="none" />
          <p className="popup__image-text"></p>
        </div>
      </div>

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
