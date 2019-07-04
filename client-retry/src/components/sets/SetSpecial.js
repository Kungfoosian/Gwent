import React, { Component } from "react";

/*
const SetSpecial = ({ centerHorizontal, left, range, unit, handleChange }) => {
  return (
    
  );
};
*/

class SetSpecial extends Component {
  render() {
    return (
      <p style={this.props.centerHorizontal}>
        <label style={this.props.left}>Special: </label>{" "}
        {this.props.unit === "leader" ? (
          <input
            type="textarea"
            name="special"
            onChange={this.props.handleChange}
            required
          />
        ) : (
          <select
            name="special"
            value={this.props.special}
            onChange={this.props.handleChange}
            readOnly={this.props.isAgile}
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
      </p>
    );
  }
}

export default SetSpecial;
