interface LocalStorageService<T> {
  getItem: (key: string) => T | null;
  setItem: (key: string, value: T) => void;
  removeItem: (key: string) => void;
}

export const useLocalStorageService = <T>(): LocalStorageService<T> => {
  const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  const setItem = (key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
};
