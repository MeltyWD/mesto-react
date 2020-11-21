import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import AddPlacePopup from './AddPlacePopup.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import headerImage from '../images/header/logo.svg'
import profileImage from '../images/profile/image.jpg'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpenClose] = React.useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpenClose] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenClose] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState([]);
  const [userInfoGet, setUserInfoGet] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
    .then(([userInfo, cardList]) => {
      setCurrentUser(userInfo)
      setCards(cardList)
    })
    .catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    if(currentUser.length !== 0) {
      setUserInfoGet(true)
    }
  }, [currentUser])

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

  function closeAllPopups() {
    setEditProfilePopupOpenClose(false);
    setAddCardPopupOpenClose(false);
    setEditAvatarPopupOpenClose(false);
    setSelectedCard('');
  }

  function handleUpdateUser(data) {
    return (
      api.patchProfileEdit(data)
      .then((result) => {
       setCurrentUser (result);
      })
      .catch((err) => console.log(err))
    )
  }

  function handleUpdateAvatar(data) {
    return (
      api.avatarEdit(data)
        .catch((err) => console.log(err))
        .then((result) => {
          setCurrentUser (result);
         })
    )
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function handleDeleteClick(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) => c._id === card._id ? '' : newCard);
        setCards(newCards);
      })
  }

  function handleAddPlaceSubmit(card) {
    return (
      api.postNewCard(card)
        .then((newCard) => {
          setCards([newCard, ...cards]);
        })
        .catch((err) => console.log(err))
    )
  }


  return (
    <>
      <Header headerImage={headerImage} />
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          loader={userInfoGet}
          profileImage={profileImage}
          onEditProfile={clickEditProfilePopupOpenClose}
          onAddCard={clickAddCardPopupOpenClose}
          onEditAvatar={clickEditAvatarPopupOpenClose}
          onCardClick={clickImagePopupOpen}
          cards={cards}
          onCardLike={handleLikeClick}
          onCardDelete={handleDeleteClick}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
      </CurrentUserContext.Provider>
      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      ></EditAvatarPopup>



      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
