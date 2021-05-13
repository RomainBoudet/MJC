/* eslint-disable no-empty */
import {
  SEND_UNSUBSCRIBE,
  SEND_ADD_EVENT,
  FETCH_EVENTS,
  PARTICIPATION,
  setEvents,
  setAddNewEvent,
  setParticipate,
} from 'src/actions/events';
import axios from 'src/api';
export default (store) => (next) => async (action) => {
  const { user: { pseudo, idUser } } = store.getState();
  const {
    events: {
      idEvent, newTitle, newDescription, newTagId, newEventDate,
    },
  } = store.getState();
  const numberId = parseInt(idUser, 10);
  switch (action.type) {
    case FETCH_EVENTS: {
      try {
        const response = await axios.get('evenements');
        store.dispatch(setEvents(response.data));
      }
      catch (error) {
        console.log('error', error);
      }
      return next(action);
    }
    case PARTICIPATION: {
      try {
        const xsrfToken = localStorage.getItem('xsrfToken');
        const options = {
          mode: 'cors',
          withCredentials: true, // normalement plus besoin car mis dans le fichier de configuration
          headers: {'x-xsrf-token': xsrfToken},
        };
        await axios.post('participants', {
          id: idEvent,
          pseudo,
        }, options);
        store.dispatch(setParticipate(true));
      }
      catch (error) {
        console.log('error', error);
      }
      return next(action);
    }
    case SEND_ADD_EVENT: {
      try {
        // on récupère le token
        const xsrfToken = localStorage.getItem('xsrfToken');
        const options = {
          mode: 'cors',
          withCredentials: true, // normalement plus besoin car mis dans le fichier de configuration
          headers: {'x-xsrf-token': xsrfToken},
        };
        console.log('je suis dans type action SEND_ADD_EVENT du middleware');
        await axios.post('evenements', {
          title: newTitle,
          description: newDescription,
          creatorId: numberId,
          eventDate: newEventDate,
          tagId: newTagId,
        }, options);
        store.dispatch(setAddNewEvent(true));
      }
      catch (error) {
        console.log('error', error);
        console.log('error.response.data', error.response.data);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
      }
      return next(action);
    }
    case SEND_UNSUBSCRIBE: {
      try {
        const xsrfToken = localStorage.getItem('xsrfToken');
        const options = {
          mode: 'cors',
          withCredentials: true, // normalement plus besoin car mis dans le fichier de configuration
          headers: {'x-xsrf-token': xsrfToken},
        };
        await axios.patch('participants', {
          id: idEvent,
          pseudo,
        }, options);
        store.dispatch(setParticipate(false));
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
