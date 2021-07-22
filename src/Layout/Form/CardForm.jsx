import { Link } from "react-router-dom";

export default function CardForm({ handleSubmit, handleChange, deck, card }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Front</label>
        <textarea
          name="front"
          id="cardFront"
          rows="3"
          placeholder="Front side of card"
          value={card.front}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Back</label>
        <textarea
          name="back"
          id="back"
          placeholder="Back side of card"
          value={card.back}
          onChange={handleChange}
        ></textarea>
      </div>
      <Link
        to={`/decks/${deck.id}`}
        type="button"
        className="btn btn-secondary"
      >
        Done
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
