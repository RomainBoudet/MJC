import { connect } from 'react-redux';
import SignInForm from 'src/components/SignInForm';
import {
  setFieldValue,
  sendSignInForm,
  logout,
  handleBlur,
} from 'src/actions/user';

const mapStateToProps = (state) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  pseudo: state.user.pseudo,
  emailAddress: state.user.emailAddress,
  passwordConfirm: state.user.passwordConfirm,
  password: state.user.password,
  signIn: state.user.signIn,
  error: state.user.error,
});
const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => dispatch(setFieldValue(value, name)),
  handleSignInForm: () => dispatch(sendSignInForm()),
  handleLogout: () => dispatch(logout()),
  handleBlur: (error) => dispatch(handleBlur(error)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
