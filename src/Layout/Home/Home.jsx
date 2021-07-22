import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";
import "./Home.css";

export default function Home({ decks, setUpdated }) {
  const history = useHistory();

  const handleDeckDelete = async (deckId) => {
    const result = window.confirm(
      `Delete this deck? You will not be able to recover it.`
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

  let deckRender = decks.map((deck, index) => (
    <div className="card" key={index}>
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">{deck.description}</p>{" "}
        <p className="card-text">
          <small className="text-muted">{deck.cards.length} cards</small>
        </p>
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
          <i className="material-icons">visibility</i>
          View
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
          <i className="material-icons">book</i>
          Study
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
  ));

  return (
    <>
      <Link to="/decks/new" className="btn btn-secondary">
        <i className="material-icons">add</i>
        Create Deck
      </Link>
      {deckRender}
    </>
  );
}
