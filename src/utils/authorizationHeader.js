import { getItemFromLocalStorage } from "./localstorage";

export const authorizationHeader = () => {
  const token = getItemFromLocalStorage("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};
