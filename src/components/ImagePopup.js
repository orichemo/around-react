import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_photo popup_open`
          : `popup popup_type_photo`
      }
    >
      <div className="popup__container popup__container_type_photo">
        <button
          className="popup__close-button"
          type="button"
          aria-label="close"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__img"
          src={props.selectedCard.link}
          alt={props.selectedCard.name}
        />
        <p className="popup__photo-title">{props.selectedCard.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
