import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReportingService from '../../../../services/ReportingService';

const ReportsInfoProvider = ({ setReports }) => {
  useEffect(() => {
    let mounted = true;
    async function run() {
      const reports = await ReportingService.getReports();
      if (mounted) {
        setReports(reports);
      }
    }
    run();
    return () => { mounted = false; };
  }, [setReports]);
  return null;
};

ReportsInfoProvider.propTypes = {
  setReports: PropTypes.func.isRequired,
};

export default ReportsInfoProvider;
