export const filter = (name) => {
  name = name.toLowerCase();
  let pattern = /[\.,:'\?!;-_\)\(\{\}\[\]s$]/g;
  return name.replace(pattern, '');
};
