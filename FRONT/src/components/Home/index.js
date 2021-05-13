import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
} from 'semantic-ui-react';
// import des composants enfants
import ContentArticles from 'src/components/Article/ContentArticles';
import { lastArray, randomArray } from 'src/selectors';
import ContentEvents from 'src/components/Event/ContentEvents';
import ContentGames from 'src/components/Game/ContentGames';
import './styles.css';

/**
 * Le composant Home appèle les composants enfants nécessaire à l'affichage de la Home
 */
const Home = ({
  events,
  articles,
  games,
  fetchArticles,
  isLogged,
  addNewArticle,
  message,
  setMessage,
}) => {
  console.log("component home addNewEvent", addNewArticle);
  /**
   * fonction qui se déclanche à chaque ajout d'article, fetchArticle va chercher tous le articles en bdd
   */
  useEffect(() => {
    async function infoArticle() {
      await fetchArticles();
    }
    infoArticle();
  }, [addNewArticle]);

  /**
   * fonction qui déclanche un chrono pour initialiser le message ou bout d'une minute
   */
  if(message){
    setTimeout(() => {
      setMessage('')
    }, 60000);
  }


  return (
    <div className="home">
       {message && <p className="success">{message}</p>}
      <h1> Notre dernier Evènement</h1>
      <ContentEvents
        elements={lastArray(events)}
      />
      <h1> Nos jeux</h1>
      <ContentGames elements={randomArray(games)} />
      <h1> Nos articles </h1>
      {isLogged && (
      <Link to="/ajoutArticle">
        <Button content="Ajouter un article" labelPosition="left" icon="edit" />
      </Link>
      )}
      <ContentArticles elements={articles} />
    </div>
  );
};
Home.propTypes = {
  events: PropTypes.array,
  articles: PropTypes.array,
  games: PropTypes.array,
  isLogged: PropTypes.bool.isRequired,
  addNewArticle: PropTypes.bool,
  fetchArticles: PropTypes.func.isRequired,
  message: PropTypes.string,
};
Home.defaultProps = {
  setMessage:()=>{},
  articles: [],
  events: [],
  games: [],
  addNewArticle: false,
  mesage:'',
};

export default Home;
