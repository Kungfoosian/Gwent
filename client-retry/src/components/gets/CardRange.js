import React from "react";

const CardRange = ({ range }) => {
  return (
    <li style={{ display: range === "n/a" ? "none" : "block" }}>
      <b>Range: </b>
      {range}
    </li>
  );
};

export default CardRange;
