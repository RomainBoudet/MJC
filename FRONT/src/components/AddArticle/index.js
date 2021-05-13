import React from 'react';
import PropTypes from 'prop-types';
import Field from 'src/components/Field';
import { Link } from 'react-router-dom';
import TextAreaDescription from 'src/components/TextAreaDescription';
import {
  Button,
} from 'semantic-ui-react';

const AddArticle = ({
  handleAddArticle,
  changeFieldArticle,
  newTitle,
  newDescription,
  newArticle,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddArticle();
  };

  return (
    <>
      <h1>Ajout d'un article</h1>
      {newArticle ? <p>"Votre article est bien enregistré, vous pouvez le visualiser en cliquant <Link to="/">sur page d'accueil"</Link></p>
        : (
          <form autoComplete="off" onSubmit={handleSubmit} className="addEvent">
            <Field
              name="newTitle"
              type="texte"
              placeholder="titre de votre article"
              onChange={changeFieldArticle}
              value={newTitle}
            />
            <div className="button-radio">

              <Field
                name="newTagId"
                type="radio"
                id="news"
                value="1"
                onChange={changeFieldArticle}
              />
              <label htmlFor="news">News</label>

              <Field
                name="newTagId"
                type="radio"
                id="evenement"
                value="2"
                onChange={changeFieldArticle}
              />
              <label htmlFor="evenement">Évenement</label>
              <Field
                name="newTagId"
                type="radio"
                id="salons"
                value="3"
                onChange={changeFieldArticle}
              />
              <label htmlFor="salons">Salons</label>
            </div>
            <TextAreaDescription
              className="newDescription"
              name="newDescription"
              placeholder="écrivez votre article"
              onChange={changeFieldArticle}
              value={newDescription}
            />

            <Button onClick={handleSubmit}>
              Valider
            </Button>
          </form>
        )}
    </>
  );
};
AddArticle.propTypes = {
  newArticle: PropTypes.bool.isRequired,
  handleAddArticle: PropTypes.func.isRequired,
  changeFieldArticle: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newDescription: PropTypes.string.isRequired,
};

export default AddArticle;
