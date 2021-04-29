import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api";
import Header from "./Header";
import Home from "./Home/index";
import Study from "./Study/index";
import CreateDeck from "./Decks/CreateDeck/index";
import Deck from "./Decks/Deck/index";
import NotFound from "./NotFound";
import AddCard from "./Cards/AddCard/index";
import EditCard from "./Cards/EditCard/index";
import EditDeck from "./Decks/EditDeck/index";

/* - - - - - - - - - - - - - - - - - - - - - - */

export default function Layout() {
  const [updated, setUpdated] = useState(0);
  const [decks, setDecks] = useState([]);

  /* - - - - - - - - - - - - - - - - - - - - - - */

  useEffect(() => {
    async function getDecks() {
      let result = await listDecks();
      setDecks(result);
    }
    getDecks();
  }, [updated]);

  /* - - - - - - - - - - - - - - - - - - - - - - */

  return (
    <>
      <Header />
      <div className="container">
        <Router>
          <Switch>
            <Route exact path>
              <Home decks={decks} setUpdated={setUpdated} />
            </Route>

            <Route path={"/decks/:deckId/study"}>
              <Study />
            </Route>

            <Route path={"/decks/:deckId/cards/:cardId/edit"}>
              <EditCard setUpdated={setUpdated} />
            </Route>

            <Route path={"/decks/:deckId/cards/new"}>
              <AddCard setUpdated={setUpdated} />
            </Route>

            <Route path={"/decks/:deckId/edit"}>
              <EditDeck decks={decks} setUpdated={setUpdated} />
            </Route>

            <Route path={"/decks/new"}>
              <CreateDeck decks={decks} setUpdated={setUpdated} />
            </Route>

            <Route path={"/decks/:deckId"}>
              <Deck setUpdated={setUpdated} />
            </Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}
