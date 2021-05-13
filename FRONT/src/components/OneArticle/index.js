import React from 'react';
import { Card, Modal, Button, } from 'semantic-ui-react'; // on imporet les composants classes de Sémentic-UI
import { nameTagId } from 'src/selectors';
import TextAreaDescription from 'src/components/TextAreaDescription';
import Field from 'src/components/Field';
import PropTypes from 'prop-types';
import './styles.css';
/**
 * containers qui permet d'afficher une carte
 * @param {props} props contenu dans un article ou un event
 */
const OneArticle = ({
  pseudo,
  article,
  sendEditArticle,
  changeFieldArticle,
  idArticleSelected,
  newTitle,
  newDescription,
  editArticle,
  newTagId,
  editNewTitle,
  editDescription, }) => {
    console.log('components oneArticle newTagId', newTagId);
    const [open, setOpen] = React.useState(false);
    /**
     * fonction qui se déclanche à la soumission du formulaire pour modifier un article
     * @param {Event} evt 
     */
    const handleEditArticleSubmit = (evt) => {
      evt.preventDefault();
      idArticleSelected(article.id);
      sendEditArticle();
      setOpen(false);
    };
    // on traite le cas où le titre et/ou la description ne sont pas modifié pour l'affichage
  if (!newTitle) {
    editNewTitle(article.title);
  }
  if (!newDescription) {
    editDescription(article.description);
  }
  return(
      <>
      {pseudo === article.authorPseudo && (
      <>
        <Modal
          size="fullscreen"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button content="Modifier votre article" labelPosition="left" icon="edit" />}
        >
          <Modal.Header>Modifier votre article</Modal.Header>
          <Modal.Description>
            <form autoComplete="off" onSubmit={handleEditArticleSubmit} className="addEvent">
              <Field
                name="newTitle"
                type="texte"
                placeholder="titre de votre article"
                onChange={changeFieldArticle}
                value={newTitle === '' ? article.title : newTitle}
                required
                focus
              />
              <div className="button-radio">
                <Field
                  name="newTagId"
                  type="radio"
                  id="news"
                  value="1"
                  onChange={changeFieldArticle}
                  required
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
                value={newDescription === '' ? article.description : newDescription}
                required
              />
              <Button open={open} onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleEditArticleSubmit}>
                Valider
              </Button>
            </form>
          </Modal.Description>
        </Modal>
      </>
      )}
      {editArticle && (
      <>
        <p className="succes">Votre article a bien été modifier.</p>
        <Card className="card oneArticle">
          <Card.Content textAlign="center" className="card__content">
            <Card.Header>{newTitle}</Card.Header>
            <Card.Header className="tag">{nameTagId(newTagId)}</Card.Header>
            <Card.Meta>
              <span className="author">{article.authorPseudo}</span>
              <span className="date">mise en ligne le { article.updatedDate || article.createdDate }</span>
            </Card.Meta>
            <Card.Description>
              {newDescription}
            </Card.Description>
          </Card.Content>
        </Card>
      </>
      )}
      {!editArticle && (
      <>
        <Card className="card oneArticle">
          <Card.Content textAlign="center" className="card__content">
            <Card.Header>{article.title}{article.eventDate && `pour la date du ${article.eventDate}`}</Card.Header>
            <Card.Header className="tag">{article.tagName}</Card.Header>
            <Card.Meta>
              <span className="author">{article.authorPseudo}</span>
              <span className="date">mise en ligne le { article.updatedDate || article.createdDate }</span>
            </Card.Meta>
            <Card.Description>
              {article.description}
            </Card.Description>
          </Card.Content>
        </Card>
        </>
      )}
        </>
  );
  };
OneArticle.propTypes = {
  article: PropTypes.object.isRequired,
  newTagId: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  sendEditArticle: PropTypes.func.isRequired,
  changeFieldArticle: PropTypes.func.isRequired,
  idArticleSelected: PropTypes.func.isRequired,
  editNewTitle: PropTypes.func.isRequired,
  editDescription: PropTypes.func.isRequired,
  editArticle: PropTypes.bool.isRequired,
  newTitle: PropTypes.string.isRequired,
  newDescription: PropTypes.string.isRequired,
};
export default OneArticle;
