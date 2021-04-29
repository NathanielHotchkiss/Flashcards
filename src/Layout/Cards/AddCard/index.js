import React, { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { createCard, readDeck } from "../../../utils/api";
import CardForm from "../../Form/CardForm";

/* - - - - - - - - - - - - - - - - - - - - - - */

export default function AddCard({ setUpdated }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "" });
  const { url } = useRouteMatch();

  /* - - - - - - - - - - - - - - - - - - - - - - */

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

  /* - - - - - - - - - - - - - - - - - - - - - - */

  const handleChange = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  /* - - - - - - - - - - - - - - - - - - - - - - */

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCard({ front: card.front, back: card.back });

    try {
      async function CreateCard() {
        let result = await createCard(deckId, card);
        setUpdated(result);
      }
      CreateCard();
    } catch (error) {
      throw error;
    }
    setCard({ front: "", back: "" });
  };

  /* - - - - - - - - - - - - - - - - - - - - - - */

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <i className="material-icons">home</i>
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={url}>Add Card</Link>
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <CardForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        card={card}
        deck={deck}
      />
    </div>
  );
}
