// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { findIdBySlug } from 'src/selectors';
// == Import des composant enfant appelé par App
import Header from 'src/containers/Header';
import Home from 'src/containers/Home';
import OneArticle from 'src/containers/OneArticle';
import LoginForm from 'src/containers/LoginForm';
import SignInForm from 'src/containers/SignInForm';
import Gardiens from 'src/components/Gardiens';
import Contact from 'src/components/Contact';
import Games from 'src/containers/Games';
import OneGame from 'src/components/OneGame';
import Events from 'src/containers/Events';
import AddArticle from 'src/containers/AddArticle';
import Event from 'src/components/Event';
import Forum from 'src/components/Forum';
import Profil from 'src/containers/Profil';
import RGPD from 'src/components/RGPD';
import Footer from 'src/components/Footer';
import ProtectedRoute from 'src/components/ProtectedRoute';
import Error from 'src/components/Error';
import Error403 from 'src/components/Error403';

import medieval3 from 'src/assets/baniere4K.png';
// import de la feuille de style
import './styles.css';

window.onunload = () => {
  localStorage.clear();
};

// == Composant
const App = (
  {
    fetchArticles,
    fetchEvents,
    fetchGames,
    events,
    articles,
    games,
    isLogged,
  },
) => {
/**
 * fonction qui s'effectue une seule fois à l'affichage de la page principale
 */
  useEffect(() => {
    // On demande à récupérer la donnée
    // Pour ca je dois donc déclencher une intention de récupération de données
    async function Allinfo() {
      await fetchArticles();
      await fetchEvents();
      await fetchGames();
    }
    Allinfo();
  }, []);
  return (
  // JSX: mélange de html et de composant de composant appelée
    <div className="app" style={{ background: `url(${medieval3})` }}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route
            // grace à l'objet match du routeur dom et sa clée params qui correspond ici à l'id
          path="/articles/:id"
          render={({ match }) => {
            const { params: { id } } = match;
            // On utilise un selecteur pour récupérer l'id de l'article'
            const foundArticle = findIdBySlug(articles, id);
            return <OneArticle article={foundArticle} />;
          }}
        />
        <Route path="/connexion">
          <LoginForm />
        </Route>
        <Route path="/inscription">
          <SignInForm />
        </Route>
        <Route path="/les-gardiens">
          <Gardiens />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route
          path="/jeux/:id"
          render={({ match }) => {
            const { params: { id } } = match;
            const foundGame = findIdBySlug(games, id);
            return <OneGame game={foundGame} />;
          }}
        />
        <Route path="/jeux">
          <Games />
        </Route>
        <Route
          path="/evenements/:id"
          render={({ match }) => {
            const { params: { id } } = match;
            const foundEvent = findIdBySlug(events, id);
            return (
              <Event event={foundEvent} />
            );
          }}
        />
        <Route path="/evenements">
          <Events />
        </Route>
        <ProtectedRoute path="/ajoutArticle" component={AddArticle} isLogged={isLogged} />
        <Route path="/forum">
          <Forum />
        </Route>
        <ProtectedRoute path="/profil" component={Profil} isLogged={isLogged} />
        <Route path="/RGPD">
          <RGPD />
        </Route>
        <Route path="/unauthorized">
          <Error403 />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};
App.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired,
  isLogged: PropTypes.bool,
};
App.defaultProps = {
  isLogged: false,
};
// == Export
export default App;
