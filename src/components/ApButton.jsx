import React from 'react';
import { Button } from '@material-ui/core';

const ApButton = ({ctx, ...props}) => {
  return (
    <Button {...props}>
      {props.children}
    </Button>
  );
};

export default ApButton;