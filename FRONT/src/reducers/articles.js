import {
  SET_ARTICLES,
  SET_FIELD_VALUE_ARTICLE,
  SET_ADD_NEW_ARTICLE,
  ID_ARTICLE_SELECTED,
  SET_EDIT_ARTICLE,
  EDIT_NEW_DESCRIPTION,
  EDIT_NEW_TITLE,
} from 'src/actions/articles';
// on exporte l'objet pour les tests unitaires
export const initialState = {
  articles: [
    {
      id: 1,
      title: '',
      description: '',
      createdDate: '',
      updateDate: null,
      authorId: 2,
      authorPseudo: '',
      tagId: 1,
      tagName: '',
      preview: '',
    },
  ],
  editArticle: false,
  newArticle: false,
  newTitle: '',
  newDescription: '',
  newTagId: "1",
  newArticleDate: '',
  idArticle: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    case SET_FIELD_VALUE_ARTICLE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_ADD_NEW_ARTICLE:
      return {
        ...state,
        newArticle: action.bool,
      };
      case ID_ARTICLE_SELECTED:
        return {
          ...state,
          idArticle: action.id,
  
        };
      case SET_EDIT_ARTICLE:
        return {
          ...state,
          editArticle: action.bool,
        };
      case EDIT_NEW_DESCRIPTION:
        return {
          ...state,
          newDescription: action.description,
        };
      case EDIT_NEW_TITLE:
        return {
          ...state,
          newTitle: action.title,
        };
    default:
      return state;
  }
};
