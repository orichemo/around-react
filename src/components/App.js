import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(data) {
    setIsImagePopupOpen(true);
    setSelectedCard({ name: data.name, link: data.link });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="body">
      <Header />
      <Main
        handleEditProfileClick={handleEditProfileClick}
        handleEditAvatarClick={handleEditAvatarClick}
        handleAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        title="Edit profile"
        name="profile"
        buttonText="Save"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          className="form__input form__input_type_name"
          id="name"
          name="name"
          placeholder="Enter your name"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="form__input-error name-error"></span>
        <input
          type="text"
          className="form__input form__input_type_about-me"
          id="about-me"
          name="about-me"
          placeholder="A few words about you"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="form__input-error about-me-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title="New place"
        name="cards"
        buttonText="Create"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          className="form__input form__input_type_title"
          id="place-title"
          name="place-title"
          placeholder="Title"
          required
          minLength="1"
          maxLength="300"
        />
        <span className="form__input-error place-title-error"></span>
        <input
          type="url"
          className="form__input form__input_type_image"
          id="image"
          name="image"
          placeholder="Image link"
          required
        />
        <span className="form__input-error image-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title="Change profile picture"
        name="avatar"
        buttonText="Save"
        mod="form__button-save_type_avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          className="form__input form__input_type_avatar"
          id="avatar"
          name="avatar"
          placeholder="profile picture link"
          required
        />
        <span className="form__input-error avatar-error"></span>
      </PopupWithForm>
      <ImagePopup
        selectedCard={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
