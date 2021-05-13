/* eslint-disable no-empty */
import {
  FETCH_ARTICLES, SEND_ADD_ARTICLE,   SEND_EDIT_ARTICLE,setArticles, setAddNewArticle, setEditArticle,
} from 'src/actions/articles';
import { setError } from 'src/actions/user';
import axios from 'src/api';
export default (store) => (next) => async (action) => {
  const { user: { idUser } } = store.getState();
  const {
    articles: {
      newTitle, newDescription, newTagId,idArticle,
    },
  } = store.getState();
  const numberId = parseInt(idUser, 10);
  const newTagIdNumber = parseInt(newTagId, 10);
  const urlEditArticle = `/articles/${idArticle}`;
  console.log('middleware articles urlEditArticle', urlEditArticle);
  switch (action.type) {
    case FETCH_ARTICLES: {
      try {
        const response = await axios.get('articles');
        store.dispatch(setArticles(response.data));
      }
      catch (error) {
        console.log('error', error);
      }
      return next(action);
    }
    case SEND_ADD_ARTICLE: {
      try {
        // on récupère le token
        const xsrfToken = localStorage.getItem('xsrfToken');
        const options = {
          mode: 'cors',
          withCredentials: true, // normalement plus besoin car mis dans le fichier de configuration
          headers: {'x-xsrf-token': xsrfToken},
        };
        await axios.post('/articles', {
          title: newTitle,
          description: newDescription,
          authorId: numberId,
          tagId: newTagIdNumber,
        }, options);
        store.dispatch(setAddNewArticle(true));
      }
      catch (error) {
        store.dispatch(setError(error.response));
        console.log('error', error);
        console.log('error.response.data', error.response);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
      }
      return next(action);
    }
    case SEND_EDIT_ARTICLE: {
      try {
        // on récupère le token
        const xsrfToken = localStorage.getItem('xsrfToken');
        const options = {
          mode: 'cors',
          withCredentials: true, // normalement plus besoin car mis dans le fichier de configuration
          headers: {'x-xsrf-token': xsrfToken},
        };
        const response = await axios.patch(urlEditArticle, {
          title: newTitle,
          description: newDescription,
          authorId: numberId,
          tagId: newTagId,
        }, options);
        console.log('middlewares articles SEND_EDIT_ARTICLE response', response);
        store.dispatch(setEditArticle(true));
      }
      catch (error) {
        console.log('error', error);
        console.log('error.response', error.response);
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
