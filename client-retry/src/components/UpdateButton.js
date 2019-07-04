import React from "react";
import "../bootstrap-4.3.1/css/bootstrap.min.css";

const UpdateButton = ({ setEdit }) => {
  return (
    <input
      className="btn btn-outline-warning"
      type="button"
      value="Update?"
      onClick={setEdit.bind(this)}
    />
  );
};

export default UpdateButton;
