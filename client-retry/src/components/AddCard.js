import React, { Component } from "react";
import "../bootstrap-4.3.1/css/bootstrap.css";
import PropTypes from "prop-types";
import uuid from "uuid";
import SetName from "./sets/SetName";
import SetFaction from "./sets/SetFaction";
import SetUnit from "./sets/SetUnit";
import SetRange from "./sets/SetRange";
import SetStrength from "./sets/SetStrength";
import SetSpecial from "./sets/SetSpecial";

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid.v4(),
      name: "",
      faction: "northern realms",
      unit: "unit",
      range: "n/a",
      strength: "0",
      special: "n/a"
    };
    this.baseState = this.state;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    if (event.target.name === "range" && event.target.value === "agile") {
      this.setState({ special: "agile" });
    }
  };

  handleSubmit = event => {
    console.log(this.state.range);
    this.props.addCard(this.state);
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="mx-auto mb-3"
        style={{ width: "21rem", backgroundColor: "#eee", padding: "1rem" }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Add a card:
        </h3>

        <SetName
          centerHorizontal={centerHorizontal}
          left={left}
          name={this.state.name}
          handleChange={this.handleChange}
        />

        <SetFaction
          centerHorizontal={centerHorizontal}
          left={left}
          faction={this.state.faction}
          handleChange={this.handleChange}
        />

        <SetUnit
          centerHorizontal={centerHorizontal}
          left={left}
          unit={this.state.unit}
          handleChange={this.handleChange}
        />

        <SetRange
          left={left}
          unit={this.state.unit}
          range={this.state.range}
          handleChange={this.handleChange}
        />

        <SetStrength
          centerHorizontal={centerHorizontal}
          left={left}
          unit={this.state.unit}
          strength={this.state.strength}
          handleChange={this.handleChange}
        />

        <SetSpecial
          centerHorizontal={centerHorizontal}
          left={left}
          unit={this.state.unit}
          special={this.state.special}
          isAgile={this.state.special === "agile" ? true : false}
          handleChange={this.handleChange}
        />

        <input
          className="btn btn-outline-success"
          style={{ display: "block", margin: "0 auto" }}
          type="submit"
          value="Add"
        />
      </form>
    );
  }
}

const left = {
  display: "inline-block",
  width: "70px"
};

const centerHorizontal = {
  marginLeft: "2rem",
  marginRight: "2rem"
};

AddCard.propTypes = {
  addCard: PropTypes.func.isRequired
};

export default AddCard;
