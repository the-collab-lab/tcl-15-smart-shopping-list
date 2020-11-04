import React from 'react';
import ListItem from './ListItem';

const SortedList = ({ itemsKeys, data }) => {
  return (
    <ul>
      {itemsKeys
        // a stolen line from Andrew's blog
        .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
        .map((key) => (
          <ListItem listItem={data[key]} key={key} itemId={key} />
        ))}
    </ul>
  );
};

export default SortedList;
