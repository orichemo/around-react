import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateCard({
      name: name,
      link: link,
    });
  };
  const handleChange = (e) => {
    e.target.name === "place-title"
      ? setName(e.target.value)
      : setLink(e.target.value);
  };
  return (
    <PopupWithForm
      title="New place"
      name="cards"
      buttonText="Create"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__input form__input_type_title"
        id="place-title"
        name="place-title"
        placeholder="Title"
        required
        minLength="1"
        maxLength="300"
        value={name || ""}
        onChange={handleChange}
      />
      <span className="form__input-error place-title-error"></span>
      <input
        type="url"
        className="form__input form__input_type_image"
        id="image"
        name="image"
        placeholder="Image link"
        required
        value={link || ""}
        onChange={handleChange}
      />
      <span className="form__input-error image-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
