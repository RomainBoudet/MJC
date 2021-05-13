import { connect } from 'react-redux';
import LoginForm from 'src/components/LoginForm';
import {
  setFieldValue,
  sendLogin,
  logout,
  emailSubmit,
  handleBlur,
} from 'src/actions/user';
import { setMessage } from 'src/actions/user';

const mapStateToProps = (state) => ({
  pseudo: state.user.pseudo,
  password: state.user.password,
  isLogged: state.user.logged,
  newEmail: state.user.newEmail,
  error: state.user.error,
  message: state.user.message,

});
const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => dispatch(setFieldValue(value, name)),
  handleLogin: () => dispatch(sendLogin()),
  handleLogout: () => dispatch(logout()),
  emailSubmit: () => dispatch(emailSubmit()),
  handleBlur: (error) => dispatch(handleBlur(error)),
  setMessage:(message) => dispatch(setMessage(message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
