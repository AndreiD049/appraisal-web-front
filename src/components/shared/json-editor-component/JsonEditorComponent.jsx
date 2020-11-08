import { OutlinedInput } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const JsonEditorComponent = ({ Component, className }) => {
  const [value, setValue] = useState('');

  const handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      console.log(evt.key);
    }
  };

  const handleChange = (evt) => {
    evt.persist();
    setValue(evt.target.value);
  };

  const Wrapper = Component || OutlinedInput;

  return (
    <Wrapper
      multiline
      value={value}
      className={className}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
    />
  );
};

JsonEditorComponent.propTypes = {
  Component: PropTypes.element.isRequired,
  className: PropTypes.string,
};

JsonEditorComponent.defaultProps = {
  className: '',
};

export default JsonEditorComponent;
