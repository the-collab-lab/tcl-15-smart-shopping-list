const filter = (name) => {
  let pattern = /[.,:'?!;\-_)({}[\]¡¿"—*%#^]*/g;
  return name.replace(pattern, '').toLowerCase().trim();
};

const existingName = (doc, name) => {
  const items = getItemsNamesFromDoc(doc);
  let filteredName = filter(name);
  return items.find((item) => filter(item) === filteredName);
};

const getItemsNamesFromDoc = (doc) => {
  let items = doc.data().items;
  let itemsNames = items.map((item) => item.name);
  return itemsNames;
};

export { existingName };
