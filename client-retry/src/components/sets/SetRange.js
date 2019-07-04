import React from "react";

const SetRange = ({ left, unit, range, handleChange }) => {
  if (unit === "leader") {
    range = "n/a";
  }

  return (
    <div>
      <p
        style={{
          display: unit === "leader" ? "none" : "block",
          marginLeft: "2rem",
          marginRight: "2rem"
        }}
      >
        <label style={left}>Range: </label>
        <select
          name="range"
          value={range}
          onChange={handleChange}
          readOnly={unit === "leader" ? true : false}
          required
        >
          <option>n/a</option>
          <option>melee</option>
          <option>ranged</option>
          <option>agile</option>
          <option>siege</option>
        </select>
      </p>
    </div>
  );
};

export default SetRange;
