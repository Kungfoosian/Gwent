import React from "react";

const SetName = ({ centerHorizontal, left, name, handleChange }) => {
  return (
    <p style={centerHorizontal}>
      <label style={left}>Name: </label>
      <input
        style={{ width: "70%" }}
        name="name"
        type="text"
        value={name}
        onChange={handleChange}
        required
      />
    </p>
  );
};

export default SetName;
