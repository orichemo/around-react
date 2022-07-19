import React from "react";

function PopupWithForm(props) {
  const submitHandler = (e) => {
    e.preventDefault();
    props.onClose();
  };

  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_open`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={`${props.name}-form`}
          className="form popup__form"
          noValidate
          onSubmit={submitHandler}
        >
          <fieldset className="form__fieldset">
            {props.children}
            <button
              type="submit"
              className={`form__button-save form__submit ${props.mod}`}
            >
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
