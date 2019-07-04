import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header style={headerStyle}>
        <h1>Gwent</h1>
      </header>
    );
  }
}

const headerStyle = {
  textAlign: "center",
  padding: "5px 0",
  borderBottom: "1px dotted silver",
  marginBottom: "20px"
};

export default Header;
