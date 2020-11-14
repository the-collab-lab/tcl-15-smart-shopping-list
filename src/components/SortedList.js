import React from 'react';
import ListItem from './ListItem';
import { filter as removePunctuation, isOutOfDate } from '../lib/helper';

const SortedList = ({ itemsKeys, data }) => {
  const compareItems = (howSoonA, howSoonB, nameA, nameB) => {
    // compareItems() checks which item has the less number of the estimated days.
    if (howSoonA < howSoonB) return -1;
    if (howSoonA > howSoonB) return 1;

    // reaching this line means that both items
    // have the same number of estimated days until the next purchase.
    // so now we have to compare by the names
    // and since names are unique one name must be greater than the other
    if (removePunctuation(nameA) > removePunctuation(nameB)) return 1;

    // returning -1 means that nameB should come first on the list
    return -1;
  };
  return (
    <ul className="sorted-list">
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

          // here we have four probabilities:
          // 1:) items of keys a and b could both be NOT out of date
          // 2:) items of keys a and b could both be out of date
          if (
            (!isOutOfDateA && !isOutOfDateB) ||
            (isOutOfDateA && isOutOfDateB)
          ) {
            // we need to compare the items by the estimated days or the names
            return compareItems(howSoonA, howSoonB, nameA, nameB);
          }

          // 3:) only the item of key a is out of date
          // we don't need to comare items here
          // the item that's out of date should always come last
          if (isOutOfDateA) return 1;

          // 4:) only the item of key b is out of date
          // and a should come first on the list
          return -1;
        })
        .map((key) => (
          <ListItem listItem={data[key]} key={key} itemId={key} />
        ))}
    </ul>
  );
};

export default SortedList;
