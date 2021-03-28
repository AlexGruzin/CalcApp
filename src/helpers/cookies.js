const addMsToDate = (ms, date = new Date()) => new Date(+date + +ms);

export const setCookie = (name, value, expireMs) => {
  const expireDate = addMsToDate(expireMs).toUTCString();
  const coockieStr = `${value}; expires=${expireDate}`;
  document.cookie = `${name}=${coockieStr}`;
};
