import { FETCH_GAMES, setGames } from 'src/actions/games';
import axios from 'src/api';

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_GAMES: {
      try {
        const xsrfToken = localStorage.getItem('xsrfToken');
        const options = {
          mode: 'cors',
          withCredentials: true, // normalement plus besoin car mis dans le fichier de configuration
          headers: {'x-xsrf-token': xsrfToken},
        };
        const response = await axios.get('jeux', options);
        store.dispatch(setGames(response.data));
      }
      catch (error) {
        console.log('error', error);
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
