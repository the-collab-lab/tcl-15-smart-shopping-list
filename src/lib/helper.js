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

const fromMilliSecToDays = (time) => Math.floor(time / (1000 * 60 * 60 * 24));

export {
  existingName,
  fromMilliSecToHours,
  getUTCNowInMilliSec,
  fromMilliSecToDays,
  filter,
};
