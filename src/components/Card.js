import React from "react";
import {
  CurrentUserContext,
} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = props.card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;
  const isOwn = props.card.owner._id !== currentUser._id;
  const cardTrashButtonMod = `card__trash-button ${
    isOwn && "card__trash-button_hide"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li key={props.card._id} className="card">
      <button
        type="button"
        aria-label="trash"
        className={cardTrashButtonMod}
        onClick={handleDeleteClick}
      ></button>
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__photo"
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-info">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="like"
            onClick={handleCardLike}
          ></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
