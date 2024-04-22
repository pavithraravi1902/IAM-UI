export const setData = (key: any, value: any) => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};

export const getData = (key: any) => {
  return localStorage.getItem(key);
};

export const clearAllAppData = () => {
  return localStorage.clear();
};

export const getActiveUser = () => {
  return getJSONValue("userDetails");
};

export const setActiveUser = (value: any) => {
  setJSONValue("userDetails", value);
};

const getJSONValue = (key: any) => {
  const jsonText = getData(key);
  return jsonText?.includes("{") ? JSON.parse(jsonText) : {};
};

const setJSONValue = (key: any, value: any) => {
  if (value instanceof Object) {
    setData(key, JSON.stringify(value));
  }
};
