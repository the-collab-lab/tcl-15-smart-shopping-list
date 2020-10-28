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

const fromMilleToHours = (time) =>
  (Date.now() - new Date(time)) / (1000 * 60 * 60);

export { existingName, fromMilleToHours };
