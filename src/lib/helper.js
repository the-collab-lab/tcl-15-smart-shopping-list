const filter = (name) => {
  let pattern = /[.,:'?!;\-_)({}[\]¡¿"—*%#^]*/g;
  return name.replace(pattern, '').toLowerCase().trim();
};

const existingName = (existingItems, newItemName) => {
  const existingItemsNames = getItemsNamesFromDoc(existingItems);
  let filteredNewItemName = filter(newItemName);
  return existingItemsNames.find(
    (item) => filter(item) === filteredNewItemName,
  );
};

const getItemsNamesFromDoc = (items) => {
  return Object.values(items).reduce((itemsNames, { name }) => {
    itemsNames.push(name);
    return itemsNames;
  }, []);
};

const getUTCNowInMilliSec = () => {
  const now = new Date();
  // get time now in milliseconds
  const time = now.getTime();
  // get timezone offset in minutes and convert it to milliseconds
  // offset is how many milliseconds you should add to your time to convert to UTC
  const offset = now.getTimezoneOffset() * 60000;
  return time + offset;
};

const fromMilliSecToHours = (time) => time / (1000 * 60 * 60);

const fromMilliSecToDays = (time) => Math.ceil(time / (1000 * 60 * 60 * 24));

//To check if the item is out of date, subtract the recentPurchase (in days) from the current date (in days)
//and compare if the result is greater than the estimated howSoon X 2.
// we're also checking if recentPurchase because when items are first added to the list
// recentPurchase is null by default. And items are not out of date if they're just added.
export const isOutOfDate = (howSoon, recentPurchase) =>
  recentPurchase &&
  fromMilliSecToDays(getUTCNowInMilliSec()) -
    fromMilliSecToDays(recentPurchase) >
    howSoon * 2;

export {
  existingName,
  fromMilliSecToHours,
  getUTCNowInMilliSec,
  fromMilliSecToDays,
  filter,
};
