import React from "react";

const SetFaction = ({ centerHorizontal, left, faction, handleChange }) => {
  return (
    <p style={centerHorizontal}>
      <label style={left}>Faction: </label>
      <select name="faction" value={faction} onChange={handleChange} required>
        <option>northern realms</option>
        <option>nilfgaardian</option>
        <option>scoia'tael</option>
        <option>monsters</option>
        <option>skellige</option>
        <option>neutral</option>
      </select>
    </p>
  );
};

export default SetFaction;
