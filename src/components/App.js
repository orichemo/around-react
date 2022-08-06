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
  const [currentUser, setCurrentUser] = React.useState({});
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

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
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
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeProfilePicture(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleUpdateCard({ name, link }) {
    api
      .createCard({ name: name, link: link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleCardLike(card) {
    console.log("get to main card like");
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(console.log);
    return card;
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
        closeAllPopups();
      })
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
