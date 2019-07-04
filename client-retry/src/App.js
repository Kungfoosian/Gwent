import React, { Component } from "react";
import Header from "./components/layout/Header";
import "./App.css";
import Card from "./components/Card";
import AddCard from "./components/AddCard";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };
  }

  addCard = card => {
    console.log(card);
    axios.post("/cards", card);
  };

  removeCard = id => {
    axios.delete(`/cards/${id}`);
    this.setState({
      cards: this.state.cards.filter(card => {
        return card.id !== id;
      })
    });
  };

  editCard = cardToEdit => {
    axios.put(`/cards/${cardToEdit.id}`, cardToEdit);
  };

  getIndex = id => {
    for (let i = 0; i < this.state.cards.length; i++) {
      if (this.state.cards[i]["id"] === id) {
        return i;
      }
    }
  };

  componentDidMount() {
    axios.get("/cards").then(res => this.setState({ cards: res.data }));
  }

  render() {
    let { cards } = this.state;
    return (
      <div className="container">
        <Header />
        <div className="add-update">
          <AddCard addCard={this.addCard} />
        </div>
        <div className="cards-container">
          {cards.map(card => {
            return (
              <Card
                card={card}
                key={card.id}
                removeCard={this.removeCard}
                getCard={this.getCard}
                editCard={this.editCard}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
