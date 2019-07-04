import React from "react";

const SetStrength = ({
  centerHorizontal,
  left,
  unit,
  strength,
  handleChange
}) => {
  if (unit === "leader") {
    strength = "0";
  }

  return (
    <p
      style={{
        display: unit === "leader" ? "none" : "block",
        marginLeft: "2rem",
        marginRight: "2rem"
      }}
    >
      <label style={left}>Strength: </label>
      <input
        type="number"
        name="strength"
        value={strength}
        min="0"
        max="10"
        onChange={handleChange}
        readOnly={unit === "leader" ? true : false}
        required
      />
    </p>
  );
};

export default SetStrength;
