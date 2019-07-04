import React from "react";

const SetUnit = ({ centerHorizontal, left, unit, handleChange }) => {
  return (
    <p style={centerHorizontal}>
      <label style={left}>Unit: </label>
      <select name="unit" value={unit} onChange={handleChange} required>
        <option>unit</option>
        <option>hero</option>
        <option>leader</option>
      </select>
    </p>
  );
};

export default SetUnit;
