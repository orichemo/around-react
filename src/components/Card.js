import React from "react";
import { api } from "../utils/Api";
import PopupWithForm from "./PopupWithForm.js";


function Card(props) {
  const [isLiked, setIsLiked] = React.useState(props.card.likes
    .map((user) => user["_id"])
    .find((id) => id === props.userId));
  const [like, setLike] = React.useState(props.card.likes.length);
  const [isDeleteCardPopupOpen , setIsDeleteCardPopupOpen] = React.useState(false);

  function handleLikeClick() {
    isLiked
      ? api
          .unLikeCard(props.card._id)
          .then(() => {
            setLike(like - 1);
            setIsLiked(!isLiked);
          })
          .catch(console.log)
      : api
          .likeCard(props.card._id)
          .then(() => {
            setLike(like + 1);
            setIsLiked(!isLiked);
          })
          .catch(console.log); 
  }

  function handleDeleteButton() {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen)
  }

  function handleClick() {
    props.onCardClick(props.card);
  }  

  return (
    <>
      <button
        type="button"
        aria-label="trash"
        className="card__trash-button"
        onClick={handleDeleteButton}
        style = {props.userId !== props.card._id && {display: "none"}}
      ></button>
      <img src={props.card.link} alt={props.card.name} className="card__photo" onClick={handleClick}/>
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-info">
          <button
            type="button"
            className={
              isLiked
                ? "card__like-button card__like-button_active"
                : "card__like-button"
            }
            aria-label="like"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{like}</span>
        </div>
      </div>
      <PopupWithForm
        title="Are you sure?"
        name="delete"
        text="Yes"
        mod="form__button-save_type_delete"
        isOpen={isDeleteCardPopupOpen}
      ></PopupWithForm>
    </>
  );
}

export default Card;
