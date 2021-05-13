import {
  SET_FIELD_VALUE,
  LOGIN,
  LOGOUT,
  SET_USER_IS_SIGN_IN,
  SET_MESSAGE,
  SET_ERROR,
  HANDLE_BLUR,
} from 'src/actions/user';

const initialState = {
  idUser: '',
  firstName: '',
  lastName: '',
  pseudo: '',
  emailAddress: '',
  role: '',
  passwordConfirm: '',
  avatar: '',
  password: '',
  logged: false,
  signIn: false,
  message: '',
  error: '',
  newEmail: '',
};

export default (state = initialState, action = {}) => {
  console.log("reducer user action.id ==>", action.id);
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case LOGIN:
      return {
        ...state,
        idUser: action.id,
        firstName: action.firstname,
        lastName: action.lastname,
        pseudo: action.pseudo,
        emailAddress: action.email,
        role: action.role,
        logged: action.logged,
        password: '',
        signIn: false,
        error:'',
      };
    case LOGOUT:
      return {
        ...state,
        idUser: '',
        firstName: '',
        lastName: '',
        pseudo: '',
        emailAddress: '',
        role: '',
        passwordConfirm: '',
        avatar: '',
        password: '',
        logged: false,
        signIn: false,
        message: '',
        error: '',
        newEmail: '',
      };
    case SET_USER_IS_SIGN_IN:
      return {
        ...state,
        signIn: action.signIn,
        password: '',
        pseudo: '',
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message,
        error: '',
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
        message: '',
      };
    case HANDLE_BLUR:
      return {
        ...state,
        error: action.error,
        message:'',
      };
    default:
      return state;
  }
};
