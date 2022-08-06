import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  };

  const handleChange = (e) => {
    e.target.name === "name"
      ? setName(e.target.value)
      : setDescription(e.target.value);
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Edit profile"
      name="edit"
      buttonText="Save"
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
        value={name || ""}
        onChange={handleChange}
      />
      <span className="form__input-error name-error"></span>
      <input
        type="text"
        className="form__input form__input_type_description"
        id="description"
        name="description"
        placeholder="A few words about you"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleChange}
      />
      <span className="form__input-error description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
