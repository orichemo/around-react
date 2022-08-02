import React from "react";
import { CurrentUserContext, CurrentCradsContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const card = React.useContext(CurrentCradsContext);
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;
  const isOwn = card.owner._id !== currentUser._id;
  const cardTrashButtonMod =  `card__trash-button ${
    isOwn && "card__trash-button_hide"
  }`;

  function handleClick() {
    props.onCardClick(card);
  }

  function handleCardLike() {
    props.onCardLike(card);
  }
  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <>
      <button
        type="button"
        aria-label="trash"
        className={cardTrashButtonMod}
        onClick={handleDeleteClick}
      ></button>
      <img
        src={card.link}
        alt={card.name}
        className="card__photo"
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-info">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="like"
            onClick={handleCardLike}
          ></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
