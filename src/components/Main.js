import React from "react";
import { api } from "./Api";
import Card from "./Card";


function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
      ([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setUserId(userData._id);
        setCards(cardsData);
      }
    ).catch(console.log);
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image">
          <img
            src={userAvatar}
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
            alt="profile picture"
          />
          <span
            onClick={props.handleEditAvatarClick}
            className="profile__edit-picture"
          ></span>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            onClick={props.handleEditProfileClick}
            className="profile__edit-button"
            type="button"
            aria-label="edit"
          ></button>
          <p className="profile__about-me">{userDescription}</p>
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
          {cards.map((card, i) => {
            return (
              <li key={i} className="card">
                <Card
                  name={card.name}
                  link={card.link}
                  cardId={card._id}
                  likes={card.likes}
                  userId={userId}
                  onCardClick = {props.onCardClick}
                />
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
