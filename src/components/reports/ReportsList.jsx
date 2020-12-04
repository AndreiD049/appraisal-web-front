import { Link } from '@material-ui/core';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ReportsInfoProvider from './components/reports-info-provider';

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const { path } = useRouteMatch();
  return (
    <>
      <ReportsInfoProvider setReports={setReports} />
      <Link color="textPrimary" href={`${path}/new`}>New report</Link>
      <ul>
        {reports.map((r) => (
          <li key={r.id}>
            <Link color="textPrimary" href={`${path}/${r.id}`}>{r.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReportsList;
