import React from 'react';
import PropTypes from 'prop-types';
import Field from 'src/components/Field';
import { Redirect } from 'react-router-dom';
import './style.css';
import {
  Button, Modal,
} from 'semantic-ui-react';

const LoginForm = ({
  pseudo,
  password,
  changeField,
  emailSubmit,
  handleLogin,
  isLogged,
  newEmail,
  error,
  message,
  handleBlur,
  setMessage,
}) => {
    /**
   * fonctin qui s'enclanche à la soumission du formulaire
   * @param {Event} evt 
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };
  const handleSubmitEmail = (evt) => {
    evt.preventDefault();
    emailSubmit();
  };
   /**
   * fonction qui déclanche un chrono pour initialiser le message d'erreur ou bout d'une minute
   */
       if(message || error){
        setTimeout(() => {
          handleBlur('');
          setMessage('');
        }, 60000);
      }
  /**
   * hook qui ouvre ou ferme la modal valider un emails
   */
  const [openEmail, setOpenEmail] = React.useState(false);
  return (
    <div className="login-form">
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      {isLogged && (
        <Redirect to="/" exact />
      )}
      {!isLogged && (
        <>
          <div className="container_login">
            <form autoComplete="off" className="login-form-element" onSubmit={handleSubmit}>
              <h1> Connexion</h1>

              <div className="pseudo">
                <Field
                  name="pseudo"
                  className="pseudo_field"
                  placeholder="Votre pseudo"
                  onChange={changeField}
                  value={pseudo}
                  onBlur={handleBlur}
                />
                <span className="popup"> Votre pseudo doit comporter au minimim 3 caractéres... </span>
              </div>

              <div className="pseudo">
                <Field
                  name="password"
                  type="password"
                  className="pseudo_field"
                  placeholder="Votre mot de passe"
                  onChange={changeField}
                  value={password}
                  onBlur={handleBlur}
                />
                <span className="popup"> Votre password doit avoir un nombre minimum de 8 caractéres, une lettre majuscule, une lettre minuscule et un caractére spécial parmis : !@#$%^&* </span>
              </div>

              <button
                className="validate"
                type="submit"
              >
                Valider
              </button>
            </form>

            <div className="pseudo">
              <Modal
                size="fullscreen"
                className="button_verifemail"
                onClose={() => setOpenEmail(false)}
                onOpen={() => setOpenEmail(true)}
                open={openEmail}
                trigger={<Button content="vérifier un email" labelPosition="left" icon="edit" />}
              >
                <form autoComplete="off" className="email-form" onSubmit={handleSubmitEmail}>
                  <Field
                    name="newEmail"
                    placeholder="votre adresse Email à vérifié"
                    onChange={changeField}
                    value={newEmail}
                    onSubmit={handleSubmitEmail}
                  />
                  <button
                    type="submit"
                    className="email_validate_button"
                  >Valider votre email
                  </button>
                </form>
              </Modal>
              <span className="popup"> Un email vérifié est nécesaire pour la connexion </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
LoginForm.propTypes = {
  pseudo: PropTypes.string,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  emailSubmit: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  error: PropTypes.string,
  message: PropTypes.string,
  newEmail: PropTypes.string,
  isLogged: PropTypes.bool,
  setMessage: PropTypes.func,
};

LoginForm.defaultProps = {
  isLogged: false,
  newEmail: '',
  message: '',
  error:'',
  pseudo:'',
  handleBlur:()=>{},
  setMessage:()=>{},
};

export default LoginForm;
