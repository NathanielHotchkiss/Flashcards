import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import { createDeck } from "../../../utils/api";
import DeckForm from "../../Form/DeckForm";
import "./CreateDeck.css";

export default function CreateDeck({ decks, setUpdated }) {
  const { url } = useRouteMatch();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  const handleChange = ({ target }) => {
    setDeck({ ...deck, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let result = createDeck({
      name: deck.name,
      description: deck.description,
    }).then((response) => {
      setUpdated(result);
      history.push(`/decks/${response.id}`);
    });
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <i className="material-icons">home</i>
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={url}>Create Deck</Link>
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <DeckForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deck={deck}
        decks={decks}
      />
    </div>
  );
}
