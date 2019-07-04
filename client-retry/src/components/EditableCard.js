import React, { Component } from "react";
import PropTypes from "prop-types";

class EditableCard extends Component {
  state = this.props.card;

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    this.props.editCard(this.state);
  };

  render() {
    let card = this.state;

    return (
      <form
        className="card mb-4"
        style={{ width: "18rem" }}
        onSubmit={this.handleSubmit}
      >
        <div className="card-body">
          <input
            style={{ fontSize: "1.75em", maxWidth: "100%" }}
            type="text"
            defaultValue={this.state.name}
            name="name"
            onChange={this.handleChange}
            required
          />

          <div className="card-text">
            <select
              style={{ margin: "7px 0" }}
              name="faction"
              defaultValue={card.faction}
              onChange={this.handleChange}
              required
            >
              <option value="northern realms">northern realms</option>
              <option value="nilfgaardian">nilfgaardian</option>
              <option value="scoia'tael">scoia'tael</option>
              <option value="monsters">monsters</option>
              <option value="skellige">skellige</option>
              <option value="neutral">neutral</option>
            </select>

            <div>
              <p>
                <label style={left}>
                  <b>Unit:</b>{" "}
                </label>
                <select
                  name="unit"
                  defaultValue={card.unit}
                  onChange={this.handleChange}
                  required
                >
                  <option>unit</option>
                  <option>hero</option>
                  <option>leader</option>
                </select>
              </p>

              <p style={{ display: card.unit === "leader" ? "none" : "block" }}>
                <label style={left}>
                  <b>Range:</b>
                </label>
                <select
                  name="range"
                  defaultValue={card.range}
                  onChange={this.handleChange}
                  required
                >
                  <option value="melee">melee</option>
                  <option value="ranged">ranged</option>
                  <option value="siege">siege</option>
                  <option value="agile">agile</option>
                  <option value="n/a">n/a</option>
                </select>
              </p>
            </div>

            <div style={{ display: card.unit === "leader" ? "none" : "block" }}>
              <label style={left}>
                <b>Strength:</b>
              </label>
              <input
                type="number"
                defaultValue={card.strength}
                name="strength"
                min="0"
                max="10"
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
              <label style={left}>
                <b>Special:</b>
              </label>

              {card.unit === "leader" ? (
                <input
                  className="mb-4"
                  type="textarea"
                  name="special"
                  onChange={this.handleChange}
                  value={card.special}
                  required
                />
              ) : (
                <select
                  name="special"
                  defaultValue={card.special}
                  onChange={this.handleChange}
                  required
                >
                  <option>n/a</option>
                  <option>berserker</option>
                  <option>agile</option>
                  <option>commander's horn</option>
                  <option>mardroeme</option>
                  <option>medic</option>
                  <option>morale boost</option>
                  <option>muster</option>
                  <option>scorch</option>
                  <option>spy</option>
                  <option>summon avenger</option>
                  <option>tight bond</option>
                </select>
              )}
            </div>
          </div>

          <input
            className="btn btn-outline-success"
            style={{ display: "block", margin: "0 auto" }}
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    );
  }
}

const left = {
  display: "inline-block",
  width: "72px"
};

EditableCard.propTypes = {
  card: PropTypes.object.isRequired,
  editCard: PropTypes.func.isRequired
};

export default EditableCard;
