import { Button, Typography } from '@material-ui/core';
import { downloadBlob } from 'download.js';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReportingService from '../../../../services/ReportingService';

const ReportDetails = () => {
  const [details, setDetails] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    let mounted = true;
    async function run() {
      const reportDetails = await ReportingService.getReport(id);
      if (mounted) {
        setDetails(reportDetails);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleGenerate = async () => {
    const reply = await ReportingService.generateReport(id, []);
    await downloadBlob('report.xlsx', reply);
  };

  let display = null;
  if (details) {
    display = (
      <>
        <Typography variant="h5" align="center">{details.name}</Typography>
        <Typography variant="body1">{details.description}</Typography>
        <Typography variant="body1">{details.template.name}</Typography>

        <br />
        <hr />
        <br />
        <Typography variant="body1">Parameters:</Typography>
        {
          details.parameters.map((param) => (
            // eslint-disable-next-line no-underscore-dangle
            <div key={param.id}>
              <Typography variant="body1">{param.name}</Typography>
              <input type="text" value={param.defaultValue} />
              <br />
            </div>
          ))
        }
        <br />
        <hr />
        <br />
        <Typography variant="body1">Aggregation:</Typography>
        <textarea rows="20" cols="60" readOnly value={JSON.stringify(JSON.parse(details.template.aggregation), null, 2)} />
        <br />
        <Button variant="contained" color="secondary" onClick={handleGenerate}>Generate</Button>
      </>
    );
  }

  return display;
};

export default ReportDetails;
