import React from "react";

const CardStrength = ({ strength }) => (
  <li style={{ display: strength === "0" ? "none" : "block" }}>
    <b>Strength: </b>
    {strength}
  </li>
);

export default CardStrength;
