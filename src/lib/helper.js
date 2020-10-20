const filter = (name) => {
  name = name.toLowerCase().trim();
  let pattern = /[.,:'?!;\-_)({}[\]¡¿"—*%#^]*/g;
  return name.replace(pattern, '');
};

export const existingName = (items, name) => {
  let filteredName = filter(name);
  return items.find((item) => filter(item) === filteredName);
};
