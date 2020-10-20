export const filter = (name) => {
  name = name.toLowerCase().trim();
  let pattern = /[.,:'?!;\-_)({}[\]¡¿"—*%#^]*/g;
  return name.replace(pattern, '');
};
