// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { validationForm } from 'src/selectors/validator.js';
// == Import : local
// == Composant
const Field = ({
  value,
  type,
  name,
  placeholder,
  onChange,
  onBlur,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };
  const handleBlur = (evt) => {
    const valueInput = evt.target.value;
    const message = validationForm(valueInput, name, placeholder);
    onBlur(message);
  };
  return (
    <div className="container-field">
      <input
        // React - state
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        // infos de base
        className="field"
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};
Field.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};
// Valeurs par défaut pour les props
Field.defaultProps = {
  value: '',
  type: 'text',
  placeholder: '',
  onBlur:()=>{},
};
// == Export
export default Field;
