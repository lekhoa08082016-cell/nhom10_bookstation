import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State để lưu trữ giá trị hiện tại
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Lỗi khi đọc key "${key}" từ localStorage:`, error);
      return initialValue;
    }
  });

  // Hàm setValue bọc ngoài useState setter để lưu vào cả localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Lỗi khi lưu key "${key}" vào localStorage:`, error);
    }
  };

  return [storedValue, setValue] as const;
}