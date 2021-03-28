import { useRef, useEffect } from 'react';

export const usePrevious = value => {
  // TODO apply it to profile builder page // TODO move to custom hooks
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const arrayToKeyedObject = (array, key) => {
  const initialValue = {};
  return array.reduce(
    (obj, item) => ({
      ...obj,
      [item[key]]: item,
    }),
    initialValue
  );
};

export function isJson(str) {
  let result;
  try {
    result = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return result;
}
