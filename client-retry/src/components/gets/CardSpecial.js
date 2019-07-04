import React from "react";

const CardSpecial = ({ special }) =>
  special !== "n/a" ? (
    <li className="mb-4">
      <b>Special: </b>
      {special}
    </li>
  ) : (
    <p style={{ visibility: "hidden" }}> Filler </p>
  );

export default CardSpecial;
