import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateDeck, readDeck } from "../../../utils/api";
import DeckForm from "../../Form/DeckForm";

export default function EditDeck({ decks, setUpdated }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    async function getDeck() {
      try {
        let result = await readDeck(deckId);
        setDeck(result);
      } catch (error) {
        throw error;
      }
    }
    getDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setDeck({ name: deck.name, description: deck.description });

    try {
      async function UpdateDeck() {
        let result = await updateDeck(deck);
        setUpdated(result);
      }
      UpdateDeck();
    } catch (error) {
      throw error;
    }
    history.push(`/decks/${deckId}`);
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={url}>Edit Deck</Link>
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <DeckForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        decks={decks}
        deck={deck}
      />
    </div>
  );
}
