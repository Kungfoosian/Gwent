import React, { Component } from "react";
import PropTypes from "prop-types";
import "../bootstrap-4.3.1/css/bootstrap.min.css";
import DefaultCard from "./DefaultCard";
import EditableCard from "./EditableCard";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false
    };
  }

  setEdit = card => {
    this.setState({
      isEdit: true
    });
  };

  render() {
    let { isEdit } = this.state;

    return (
      <React.Fragment>
        {isEdit ? (
          <EditableCard card={this.props.card} editCard={this.props.editCard} />
        ) : (
          <DefaultCard
            card={this.props.card}
            removeCard={this.props.removeCard}
            setEdit={this.setEdit}
          />
        )}
      </React.Fragment>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  removeCard: PropTypes.func.isRequired
};

export default Card;
