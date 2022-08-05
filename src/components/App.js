import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import RemoveCardPopup from "./RemoveCardPopup.js";
import api from "../utils/api.js";
import {
  CurrentUserContext,
  CurrentCradsContext,
} from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => setCurrentUser(userInfo))
      .catch(console.log);
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch(console.log);
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleTrashButtonClick(card) {
    setIsDeleteCardPopupOpen(!isAddPlacePopupOpen);
    setSelectedCard(card);
  }

  function handleCardClick(data) {
    setIsImagePopupOpen(true);
    setSelectedCard(data);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserProfile(name, about)
      .then((user) => setCurrentUser(user))
      .catch(console.log);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeProfilePicture(avatar)
      .then((user) => setCurrentUser(user))
      .catch(console.log);
  }

  function handleUpdateCard({ name, link }) {
    api
      .createCard({ name: name, link: link })
      .then((newCard) => setCards([newCard, ...cards]))
      .catch(console.log);
  }

  function handleCardLike(card) {
    console.log("get to main card like");
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    });
    return card;
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(setCards(cards.filter((item) => item !== card)))
      .catch(console.log);
  }

  return (
    <div>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentCradsContext.Provider value={cards}>
          <Main
            handleEditProfileClick={handleEditProfileClick}
            handleEditAvatarClick={handleEditAvatarClick}
            handleAddPlaceClick={handleAddPlaceClick}
            handleCardLike={handleCardLike}
            handleTrashClick={handleTrashButtonClick}
            onCardClick={handleCardClick}
          />
        </CurrentCradsContext.Provider>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </CurrentUserContext.Provider>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onUpdateCard={handleUpdateCard}
      />
      <RemoveCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onConfirm={handleCardDelete}
        selectedCard={selectedCard}
      ></RemoveCardPopup>
      <Footer />
      <ImagePopup
        selectedCard={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;

/*
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _processResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  patchUserProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._processResponse);
  }

  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._processResponse);
  }

  deleteCard(id) {
    return fetch(`https://around.nomoreparties.co/v1/cohort-3-en/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    console.log(isLiked);
    return isLiked ? this.likeCard(id) : this.unLikeCard(id);
  }

  likeCard(id) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/${id}`,
      {
        method: "PUT",
        headers: this._headers,
      }
    ).then(this._processResponse);
  }

  unLikeCard(id) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/${id}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(this._processResponse);
  }

  changeProfilePicture(link) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        }),
      }
    ).then(this._processResponse);
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "3b82c4e5-0fac-48ec-9210-bfe6ee07c30f",
    "Content-Type": "application/json",
  },
});

export default api;


*/
