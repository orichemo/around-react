import React from "react";
import Card from "./Card";
import { CurrentUserContext, CurrentCradsContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CurrentCradsContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image">
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="profile avatar"
          />
          <span
            onClick={props.handleEditAvatarClick}
            className="profile__edit-picture"
          ></span>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={props.handleEditProfileClick}
            className="profile__edit-button"
            type="button"
            aria-label="edit"
          ></button>
          <p className="profile__about-me">{currentUser.about}</p>
        </div>
        <button
          onClick={props.handleAddPlaceClick}
          className="profile__add-button"
          type="button"
          aria-label="add"
        ></button>
      </section>
      <section>
        <ul className="cards">
          {cards.map((card) => {
            return (
              <li key={card._id} className="card">
                <CurrentCradsContext.Provider value={card}>
                  <Card
                    onCardClick={props.onCardClick}
                    onCardLike={props.handleCardLike}
                    onCardDelete={props.handleCardDelete}
                  />
                </CurrentCradsContext.Provider>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

/*

*/
