export const addItemToLocalStorage = (key, user) => {
  localStorage.setItem(key, JSON.stringify(user));
};

export const removeItemsFromLocalStorage = () => localStorage.clear();

export const getItemFromLocalStorage = key => {
  const result = localStorage.getItem(key);
  const user = result ? JSON.parse(result) : null;
  return user;
};
