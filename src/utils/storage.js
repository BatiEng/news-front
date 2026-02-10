const KEY = "gk_user";

export const setUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
};

export const clearUser = () => {
  localStorage.removeItem(KEY);
};
