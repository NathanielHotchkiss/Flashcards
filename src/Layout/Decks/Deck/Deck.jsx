import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  readDeck,
  deleteDeck,
  deleteCard,
  listCards,
} from "../../../utils/api";

export default function Deck({ setUpdated }) {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function LoadDeck() {
      try {
        let result = await readDeck(deckId);
        setDeck(result);
      } catch (error) {
        throw error;
      }
    }
    LoadDeck();
  }, [deckId]);

  useEffect(() => {
    async function getCards() {
      let result = await listCards(deckId);
      setCards(result);
    }
    getCards();
  }, [deckId]);

  const handleDeckDelete = async (deckId) => {
    const result = window.confirm(
      `Delete deck? You will not be able to recover it.`
    );
    if (result) {
      async function deleteData() {
        try {
          let result = await deleteDeck(deckId);
          setUpdated(result);
          history.push("/");
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted");
          } else {
            throw error;
          }
        }
      }
      deleteData();
    }
  };

  const handleCardDelete = async ({ target }) => {
    const value = target.value;
    const result = window.confirm(
      `Delete this card? You will not be able to recover it.`
    );
    if (result) {
      async function deleteData() {
        try {
          await deleteCard(value);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted");
          } else {
            throw error;
          }
        }
      }
      deleteData();
    }
  };

  let deckRender = (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">{deck.description}</p>{" "}
        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">
          <i className="material-icons">edit</i>
          Edit
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
          <i className="material-icons">book</i>
          Study
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          <i className="material-icons">add</i>
          Add Cards
        </Link>
        <button
          onClick={() => handleDeckDelete(deck.id)}
          value={deck.id}
          className="btn btn-danger"
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  );

  let cardRender = cards.map((card, index) => (
    <div className="card" key={index}>
      <div className="card-body">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-6">{card.front}</div>
            <div className="col-6">{card.back}</div>
          </div>
          <div className="row">
            <div className="col-9"></div>
            <div className="col-3">
              <Link
                to={`/decks/${deckId}/cards/${card.id}/edit`}
                className="btn btn-secondary"
              >
                <i className="material-icons">edit</i>
                Edit
              </Link>
              <button
                onClick={handleCardDelete}
                value={card.id}
                className="btn btn-danger"
              >
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <i className="material-icons">home</i>
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link>Deck</Link>
          </li>
        </ol>
      </nav>
      {deckRender}
      {cardRender}
    </>
  );
}
