import React from 'react';
import ListItem from './ListItem';
import { filter as removePunctuation, isOutOfDate } from '../lib/helper';

const SortedList = ({ itemsKeys, data }) => {
  const compareItems = (howSoonA, howSoonB, nameA, nameB) =>
    // compareItems() checks which item has the less number of the estimated days.
    // returning -1 one for the item whose howSoon is less
    // means that sort() will put it first and therefore comes first on the list
    howSoonA < howSoonB
      ? -1
      : // the number with the greater number of the estimated days comes second
      howSoonA > howSoonB
      ? 1
      : // reaching this line means that both items
      // have the same number of estimated days until the next purchase.
      // so now we have to compare by items name
      // and since names are unique one name must be greater than the other
      removePunctuation(nameA) > removePunctuation(nameB)
      ? 1
      : -1;

  return (
    <ul aria-label="List of items">
      {itemsKeys
        .sort((a, b) => {
          // setup all the variables we will need
          let [howSoonA, nameA, howSoonB, nameB] = [
            data[a].howSoon,
            data[a].name,
            data[b].howSoon,
            data[b].name,
          ];
          let [isOutOfDateA, isOutOfDateB] = [
            isOutOfDate(howSoonA, data[a].recentPurchase),
            isOutOfDate(howSoonB, data[b].recentPurchase),
          ];

          // here we have four options:
          // 1:) items of keys a and b could both be NOT out of date
          // 2:) items of keys a and b could both be out of date
          // 3:) only the item of key a is out of date
          // 4:) only the item of key b is out of date
          return (!isOutOfDateA && !isOutOfDateB) ||
            (isOutOfDateA && isOutOfDateB)
            ? // options 1 and 2 go here to compare the items
              // using compareItems()
              compareItems(howSoonA, howSoonB, nameA, nameB)
            : // options 3 and 4 go here
            // but here we don't have to compare and sort because
            // the item that is NOT out of date always wins.
            // returning -1 for the winning item means that
            // it'll come first on the list
            isOutOfDateA
            ? 1
            : -1;
        })
        .map((key) => (
          <ListItem listItem={data[key]} key={key} itemId={key} />
        ))}
    </ul>
  );
};

export default SortedList;
