import React from 'react';
import ListItem from './ListItem';

const SortedList = ({ itemsKeys, data }) => {
  return (
    <ul>
      {itemsKeys
        // This explicitly compares between a or b, in order to sort the items by the keys
        // If a is greater than b, it will return 1, else if a is less than b it will return -1
        // Or else, it will return 0
        .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
        .map((key) => (
          <ListItem listItem={data[key]} key={key} itemId={key} />
        ))}
    </ul>
  );
};

export default SortedList;
