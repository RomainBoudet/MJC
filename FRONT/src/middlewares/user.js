/* eslint-disable no-empty */
import {
  SEND_SIGN_IN_FORM,
  SEND_LOGIN,
  SEND_DISCONNECT,
  EMAIL_SUBMIT,
  setUserIsSignIn,
  login,
  logout,
  setMessage,
  setError,
} from 'src/actions/user';
import axios from 'src/api';

export default (store) => (next) => async (action) => {
  const {
    user: {
      newEmail,
      pseudo,
      password,
      firstName,
      lastName,
      emailAddress,
      passwordConfirm,
    },
  } = store.getState();
  switch (action.type) {
    case SEND_LOGIN: {
      try {
        const response = await axios.post('connexion', {
          pseudo,
          password,
        }, {
          withCredentials: true
        });
        // on initialise dans la réponse config.data
        response.config.data = {
          "pseudo": "",
          "password": ""
        };
        //console.log("response ",response);
        //console.log("response.data.xsrfToken ",response.data.xsrfToken);
        // Une fois que c'est terminé, si le login est bon on connecte
        localStorage.setItem('xsrfToken', response.data.xsrfToken);
        //console.log("xsrfToken du body de l'API =>", response.data.xsrfToken);
        console.log("middleware user response.data.id ==>>>", response.data.id);
        store.dispatch(login(response.data.email, response.data.firstname, response.data.id, response.data.lastname, response.data.logged, response.data.pseudo, response.data.role));
        store.dispatch(setMessage('Vous êtes connecté'));
      } catch (error) {
        store.dispatch(setError('message du middelware Votre identifiant ou votre mot de passe est incorrect'));
      }
      return next(action);
    }
    case SEND_SIGN_IN_FORM: {
      try {
        // Puis on fait en POST la requete de connexion
        const response = await axios.post('inscription', {
          pseudo,
          firstName,
          lastName,
          emailAddress,
          password,
          passwordConfirm,
        });
        store.dispatch(setMessage(response.data.message));
        store.dispatch(setUserIsSignIn(true));
      } catch (error) {
        if (error.response.data === '"passwordConfirm" must be [ref:password]') {
          store.dispatch(setError('Votre mot de passe n\'est pas identique à votre confirmation de mot de passe'));
        } else {
          store.dispatch(setError(error.response.data));
        }
      }
      return next(action);
    }
    case SEND_DISCONNECT: {
      try {
        // on récupère le token
        const xsrfToken = localStorage.getItem('xsrfToken');
        const options = {
          mode: 'cors',
          withCredentials: true, // normalement plus besoin car mis dans le fichier de configuration
          headers: {
            'x-xsrf-token': xsrfToken
          },
        };
        await axios.get('deconnexion', options);
        // je supprime le token du localStorage;
        localStorage.removeItem('xsrfToken');
        store.dispatch(logout());
      } catch (error) {}
      return next(action);
    }
    case EMAIL_SUBMIT: {
      try {
        const xsrfToken = localStorage.getItem('xsrfToken');
        const options = {
          mode: 'cors',
          withCredentials: true, // normalement plus besoin car mis dans le fichier de configuration
          headers: {
            'x-xsrf-token': xsrfToken
          },
        };
        await axios.post('/resendEmailLink', {
          email: newEmail
        }, options);
      } catch (error) {
        console.log('error', error);
        console.log('error.response.data', error.response.data);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
