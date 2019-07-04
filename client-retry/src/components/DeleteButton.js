import React from "react";
import "../bootstrap-4.3.1/css/bootstrap.min.css";

const DeleteButton = ({ removeCard, card }) => {
  return (
    <input
      className="btn btn-outline-danger"
      type="button"
      value="Delete?"
      onClick={removeCard.bind(this, card.id)}
    />
  );
};

export default DeleteButton;
