import { OutlinedInput } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const JsonEditorComponent = ({
  value, setValue, Component, readOnly, className,
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
      rows={20}
      rowsMax={30}
      readOnly={readOnly}
      value={value}
      className={className}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
    />
  );
};

JsonEditorComponent.propTypes = {
  value: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  Component: PropTypes.element.isRequired,
  className: PropTypes.string,
};

JsonEditorComponent.defaultProps = {
  readOnly: false,
  className: '',
};

export default JsonEditorComponent;
