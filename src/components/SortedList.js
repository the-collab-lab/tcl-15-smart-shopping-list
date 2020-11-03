import React from 'react';
import ListItem from './ListItem';

const SortedList = ({ itemsKeys, data }) => {
  return (
    <ul>
      {itemsKeys
        .sort((a, b) => (a > b ? 1 : -1))
        .map((key) => {
          return <ListItem listItem={data[key]} key={key} itemId={key} />;
        })}
    </ul>
  );
};

export default SortedList;
