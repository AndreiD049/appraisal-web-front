import { useEffect } from 'react';
import AppraisalService from '../../../../services/AppraisalService';

const HomePlannedItemsInfoProvider = ({ setItems, ...props }) => {
    useEffect(() => {
        async function run() {
            console.log("get info");
            setItems(await AppraisalService.getOrphans());
        }
        run()
    }, [setItems]);

    return null;
};

export default HomePlannedItemsInfoProvider;