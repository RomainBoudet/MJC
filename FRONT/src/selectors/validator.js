/* --------------------------------------------*
* FONCTION POUR LA VALIDATION DES FORMULAIRES *
*---------------------------------------------*\
/**
 * fonction qui vérifie le nom ou le prénom d'un champs
 * @param {string} name - valeur du nom ou du prénom saisie
 */
 const validationName = (name) => {
  const regexPassword = /^\S{2,}$/;
  return regexPassword.test(name);
};
/**
 * fonction qui vérifie le nom ou le prénom d'un champs
 * @param {string} pseudo - valeur du nom ou du prénom saisie
 */
const validationPseudo = (pseudo) => {
  const regexPassword = /^\S{3,40}$/;
  return regexPassword.test(pseudo);
};
/**
 * fonction qui permet de vérifier le mot de passe
 * @param {string} password
 */
const validationPassword = (password) => {
  const regexPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
  return regexPassword.test(password);
};
/**
 * fonction qui permet de vérifier l'email
 * @param {string} email
 */
const validationEmail = (email) => {
  const regexPassword = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexPassword.test(email);
};
/**
 * fonction qui permet de vérifier la longeur de la description de l'article
 * @param {string} description
 */
 const validationNewDescription = (description) => {
  const regexPassword = /^(.{15,})$/;
  return regexPassword.test(description);
};
/**
 * fonction qui vérifie la saisie de l'utilisateur d'un champs après les pertes du focus
 * @param {Event} valueInput - valeur du champ input
 * @param {string} nameInput - nom du champ input
 * @param {string} placeholder - text dans l'input
 */
export const validationForm = (valueInput, nameInput, placeholder) => {
  if (!valueInput) {
    return `Le champs de votre ${placeholder} ne peut être vide`;
  }
  if (nameInput === 'firstName' && (!validationName(valueInput))) {
    return `Le champs de votre ${placeholder} doit contenir au minimum 2 caratères, sans espace`;
  }
  if (nameInput === 'lastName' && (!validationName(valueInput))) {
    return `Le champs de votre ${placeholder} doit contenir au minimum 2 caratères, sans espace`;
  }
  if (nameInput === 'password' && (!validationPassword(valueInput))) {
    return `Le champs de votre ${placeholder}  doit avoir 8 caractéres au minimum, une lettre minuscule, une lettre majuscule, un nombre et un caractéres spécial parmis : (!@#$%^&*)`;
  }
  if (nameInput === 'emailAddress' && (!validationEmail(valueInput))) {
    return `Le format de votre ${placeholder} est incorrect.`;
  }
  if (nameInput === 'passwordConfirm' && (!validationPassword(valueInput))) {
    return `Le champs de votre ${placeholder}  doit avoir 8 caractéres au minimum, une lettre minuscule, une lettre majuscule, un nombre et un caractéres spécial parmis : (!@#$%^&*)`;
  }
  if (nameInput === 'pseudo' && (!validationPseudo(valueInput))) {
    return `Le champs de votre ${placeholder} doit contenir au minimum 3 caractéres et 40 au maximum, sans espace.`;
  }
  if (nameInput ==='newDescription' && (!validationNewDescription(valueInput))) {
    return `Le champs de votre ${placeholder} doit contenir un minimum de 15 caractéres`;
  }
  return '';
};
