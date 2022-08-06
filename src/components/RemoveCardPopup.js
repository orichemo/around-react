import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function RemoveCardPopup(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onConfirm(props.selectedCard);
  };

  return (
    <PopupWithForm
      title="Are you sure?"
      name="delete"
      buttonText="Yes"
      mod="form__button-save_type_delete"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default RemoveCardPopup;
