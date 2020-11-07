import { useEffect } from 'react';
import AppraisalService from '../../../../services/AppraisalService';

const HomePlannedItemsInfoProvider = ({ setItems }) => {
  useEffect(() => {
    async function run() {
      setItems(await AppraisalService.getOrphans());
    }
    run();
  }, [setItems]);

  return null;
};

export default HomePlannedItemsInfoProvider;
