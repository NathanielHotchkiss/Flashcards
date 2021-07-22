import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../../../utils/api";
import { useEffect, useState } from "react";
import CardForm from "../../Form/CardForm";

export default function EditCard({ setUpdated }) {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "" });
  const { url } = useRouteMatch();
  const history = useHistory();

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

  useEffect(() => {
    async function ReadCard() {
      try {
        let result = await readCard(cardId);
        setCard(result);
      } catch (error) {
        throw error;
      }
    }
    ReadCard();
  }, [cardId]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCard((prev) => ({ ...prev, front: card.front, back: card.back }));

    try {
      async function UpdateCard() {
        let result = await updateCard(card);
        setUpdated(result);
      }
      UpdateCard();
    } catch (error) {
      throw error;
    }
    history.push(`/decks/${deck.id}`);
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
            <Link to={url}>Add Card</Link>
          </li>
        </ol>
      </nav>
      <h2>Edit Card {card.id}</h2>
      <CardForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        card={card}
        deck={deck}
      />
    </div>
  );
}
