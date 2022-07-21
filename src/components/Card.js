import React from "react";

function Card(props) {
  const [like, setLike] = React.useState(props.card.likes.length);

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <>
      <button
        type="button"
        aria-label="trash"
        className="card__trash-button"
        style={props.userId !== props.card._id && { display: "none" }}
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
            className="card__like-button"
            aria-label="like"
          ></button>
          <span className="card__like-counter">{like}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
