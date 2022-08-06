import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      title="Change profile picture"
      name="avatar"
      buttonText="Save"
      mod="form__button-save_type_avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="form__input form__input_type_avatar"
        id="avatar"
        name="avatar"
        placeholder="profile picture link"
        required
        ref={avatarRef}
      />
      <span className="form__input-error avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
