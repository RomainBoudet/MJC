// Types d'action
export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const SET_ARTICLES = 'SET_ARTICLES';
export const SEND_ADD_ARTICLE = 'SEND_ADD_ARTICLE';
export const SET_FIELD_VALUE_ARTICLE = 'SET_FIELD_VALUE_ARTICLE';
export const SET_ADD_NEW_ARTICLE = 'SET_ADD_NEW_ARTICLE';
export const SET_EDIT_ARTICLE = 'SET_EDIT_ARTICLE';
export const EDIT_NEW_TITLE = 'EDIT_NEW_TITLE';
export const EDIT_NEW_DESCRIPTION = 'EDIT_NEW_DESCRIPTION';
export const ID_ARTICLE_SELECTED = 'ID_ARTICLE_SELECTED';
export const SEND_EDIT_ARTICLE = 'SEND_EDIT_ARTICLE';

// Action creator
export const fetchArticles = () => ({
  type: FETCH_ARTICLES,
});
export const setArticles = (articles) => ({
  type: SET_ARTICLES,
  articles,
});

/**
 * action qui envoye à la base de données un nouvel ARTICLE
 */
export const sendAddArticle = () => {
  console.log('je suis dans actoins sendAddArticle');
  return ({
    type: SEND_ADD_ARTICLE,
  });
};
/**
 * Action qui lors de l'ajout d'un ARTICLEment va déclancher
 * l'affichage de tous articles et celui en plus
 */
export const setAddNewArticle = (bool) => ({
  type: SET_ADD_NEW_ARTICLE,
  bool,
});

/**
 * Action permettant de mettre à jour la valeur d'un champs dans le store
 * @param {String} value
 * @param {String} name
 */
export const setFieldValueArticle = (value, name) => ({
  type: SET_FIELD_VALUE_ARTICLE,
  value,
  name,
});

/**
 * action qui indique et stock le numéro d'id de l'évènement pour le modifier
 */
 export const idArticleSelected = (id) => ({
  type: ID_ARTICLE_SELECTED,
  id,
});

/**
 * action qui lors de la modification d'un article va déclancher son affichage
 */
 export const setEditArticle = (bool) => ({
  type: SET_EDIT_ARTICLE,
  bool,
});
/**
 * action qui permet d'afficher le titre en preview si il n'a pas été modifié
 * @param {string} title 
 */
export const editNewTitle = (title) => ({
  type: EDIT_NEW_TITLE,
  title,
});
/**
 * action qui permet d'afficher la description en preview si elle n'a pas été modifié
 * @param {string} description 
 */
export const editDescription = (description) => ({
  type: EDIT_NEW_DESCRIPTION,
  description,
});

/**
 * action qui envoye à la base de données une modification d'article
 */
 export const sendEditArticle = () => ({
  type: SEND_EDIT_ARTICLE,
});




