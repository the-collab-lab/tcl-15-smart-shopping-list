import Bus from './bus';

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
const hourInMilliSeconds = 1000 * 60 * 60;
const dayInMilliSeconds = hourInMilliSeconds * 24;

const fromMilliSecToHours = (time) => time / hourInMilliSeconds;

const fromMilliSecToDays = (time) => Math.ceil(time / dayInMilliSeconds);

export const isOutOfDate = ({ howSoon, recentPurchase }) => {
  // an item is out of date if the number of days from the last purchase is greater than howSoon X 2.
  // we're also checking if recentPurchase because when the items are first added to the list
  // recentPurchase is null by default. And the items shouldn't be out of date if they're just added.
  const daysFromLastPurchase = getDaysSinceLastPurchase(recentPurchase);

  return recentPurchase !== null && daysFromLastPurchase > howSoon * 2;
};

export const getDaysSinceLastPurchase = (recentPurchase) =>
  fromMilliSecToDays(getUTCNowInMilliSec() - recentPurchase);

const calculateNextPurchase = (howSoon, recentPurchase) =>
  // add the estimated days until the next purchase (howSoon in milliseconds) to
  // the last purchase to calculate the next purchase date
  recentPurchase + howSoon * dayInMilliSeconds;

export const getDaysUntilNextPurchase = ({ howSoon, recentPurchase }) => {
  if (!recentPurchase) return howSoon;
  const nextPurchaseDate = calculateNextPurchase(howSoon, recentPurchase);

  return fromMilliSecToDays(nextPurchaseDate - getUTCNowInMilliSec());
};

const formatDate = (dateInMilliSec) => {
  // formate the date in a full written month, a numeric day, and a numeric year
  // e.g. November 17, 2020
  const date = new Date(dateInMilliSec);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleString('en-US', options);
};

const displayMessage = (content, type) => {
  Bus.emit('flash', {
    content,
    type,
  });
};

export {
  existingName,
  fromMilliSecToHours,
  getUTCNowInMilliSec,
  fromMilliSecToDays,
  filter,
  displayMessage,
  formatDate,
  calculateNextPurchase,
};
