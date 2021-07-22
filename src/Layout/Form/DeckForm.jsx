import { Link } from "react-router-dom";

export default function DeckForm({ handleSubmit, handleChange, deck }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Deck name"
            value={deck.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Brief decription of the deck"
            value={deck.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <Link to={"/"} type="button" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
