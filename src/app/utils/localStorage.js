// utils/localStorage.js

export const setLocalStorageItem = (key, value) => {
  if (typeof window !== "undefined") {
    // Only run in the client-side (browser)
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
  }
  return null;
};

export const removeLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
