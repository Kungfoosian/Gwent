import React from "react";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
import CardName from "./gets/CardName";
import CardFaction from "./gets/CardFaction";
import CardUnit from "./gets/CardUnit";
import CardRange from "./gets/CardRange";
import CardStrength from "./gets/CardStrength";
import CardSpecial from "./gets/CardSpecial";
import "../bootstrap-4.3.1/css/bootstrap.min.css";

const DefaultCard = ({ card, removeCard, setEdit }) => (
  <div className={"card mb-4"} style={getBorder(card.unit, card.faction)}>
    <div className="card-body">
      <CardName name={card.name} />
      <ul className="card-text" style={{ listStyle: "none" }}>
        <CardFaction faction={card.faction} />
        <CardUnit unit={card.unit} />
        <CardRange range={card.range} />
        <CardStrength strength={card.strength} />
        <CardSpecial special={card.special} />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DeleteButton card={card} removeCard={removeCard} />
          <UpdateButton card={card} setEdit={setEdit} />
        </div>
      </ul>
    </div>
  </div>
);

const getBorder = (unit, faction) => {
  const borderStyle = {
    width: "18rem",
    borderWidth: "3px"
  };

  let factionColor = "";
  switch (unit) {
    case "leader":
      factionColor = getFactionColor(faction);
      borderStyle.borderColor = factionColor;
      break;
    case "hero":
      factionColor = getFactionColor(faction);
      borderStyle.borderImage = `linear-gradient(90deg, white, yellow, ${factionColor}, ${factionColor}) 1`;
      break;
    case "unit":
      factionColor = getFactionColor(faction);
      borderStyle.borderImage = `linear-gradient(90deg, white, ${factionColor}, ${factionColor}, white) 1`;
      break;
    default:
      borderStyle.borderColor = "gray";
  }

  return borderStyle;
};

const getFactionColor = faction => {
  switch (faction) {
    case "northern realms":
      return "blue";
    case "nilfgaardian":
      return "black";
    case "scoia'tael":
      return "green";
    case "monsters":
      return "red";
    default:
      return "purple";
  }
};

export default DefaultCard;
