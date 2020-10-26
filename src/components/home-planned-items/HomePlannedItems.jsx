import React from 'react';
import { useState } from 'react';
import HomePlannedItemsDisplay from './components/HomePlannedItemsDisplay';
import HomePlannedItemsInfoProvider from './components/HomePlannedItemsInfoProvider/HomePlannedItemsInfoProvider';

const HomePlannedItems = (props) => {
    const [items, setItems] = useState([]);

    console.log(items);

    return (
        <>
            <HomePlannedItemsInfoProvider setItems={setItems} />
            <HomePlannedItemsDisplay items={items} setItems={setItems} />
        </>
    );
};

export default HomePlannedItems;