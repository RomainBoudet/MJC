import React from 'react';
import { Card } from 'semantic-ui-react'; // import des composants qui contienne les classes de Sémentique UI
import PropTypes from 'prop-types'; // import de prop-types qui vérifie le typage des props du container
import CardGame from 'src/components/Game/CardGame'; // import du composant enfant appelée par Content

/**
 *
 * @param {props} elements
 */
const ContentGames = ({ elements }) => (
  <section className="content">
    <Card.Group>
      {elements.map((element) => (<CardGame key={element.id.toString()} {...element} />))}
    </Card.Group>
  </section>
);
/**
 * les propType vérifie que event et article sont de type tableau
 *  chaque tableau doit contenir un id qui est un nombre
 */
ContentGames.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

// si la props n'est pas requis, on lui donne une valeur par default
ContentGames.defaultProps = {
  elements: [],
};

export default ContentGames;
