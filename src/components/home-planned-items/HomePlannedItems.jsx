import React, { useState } from 'react';

import HomePlannedItemsDisplay from './components/HomePlannedItemsDisplay';
import HomePlannedItemsInfoProvider from './components/HomePlannedItemsInfoProvider/HomePlannedItemsInfoProvider';

const HomePlannedItems = () => {
  const [items, setItems] = useState([]);

  return (
    <>
      <HomePlannedItemsInfoProvider setItems={setItems} />
      <HomePlannedItemsDisplay items={items} setItems={setItems} />
    </>
  );
};

export default HomePlannedItems;
