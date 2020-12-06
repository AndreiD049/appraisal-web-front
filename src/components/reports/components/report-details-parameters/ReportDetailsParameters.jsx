import {
  Box, Divider, TextField, Typography,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const ReportDetailsParameters = ({ params, handleUpdate }) => (
  <>
    {
          params.map((d, idx) => (
            <>
              <Box className="flexColumn owl">
                <Typography variant="body1">
                  <strong>Name: </strong>
                  { ' ' }
                  {d.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Path: </strong>
                  { ' ' }
                  {d.path}
                </Typography>
                <TextField
                  label="Value"
                  variant="standard"
                  value={d.value}
                  onChange={handleUpdate(idx)}
                />
              </Box>
              <Divider style={{ width: '100%' }} />
            </>
          ))
    }
  </>
);

ReportDetailsParameters.propTypes = {
  params: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default ReportDetailsParameters;
