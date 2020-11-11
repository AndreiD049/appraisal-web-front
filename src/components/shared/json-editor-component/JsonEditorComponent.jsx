import { OutlinedInput } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const JsonEditorComponent = ({
  value, setValue, Component, className,
}) => {
  const handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      console.log(evt.key);
    }
  };

  const handleChange = (evt) => {
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
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  Component: PropTypes.element.isRequired,
  className: PropTypes.string,
};

JsonEditorComponent.defaultProps = {
  className: '',
};

export default JsonEditorComponent;
