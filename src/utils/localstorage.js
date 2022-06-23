export const addItemToLocalStorage = (key, user) => {
  localStorage.setItem(key, JSON.stringify(user));
};

export const removeItemsFromLocalStorage = () => localStorage.clear();

export const getItemFromLocalStorage = key => {
  const result = localStorage.getItem(key);
  const item = result ? JSON.parse(result) : null;
  return item;
};
