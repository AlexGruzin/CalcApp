export default function namespace(obj, np, separator = '/') {
  const keys = Object.keys(obj);

  return keys.reduce((accumulator, key) => {
    accumulator[key] = `${np}${separator}${key}`;

    return accumulator;
  }, {});
}
