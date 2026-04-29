import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Cập nhật giá trị sau một khoảng thời gian (delay)
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Xóa timeout nếu value thay đổi trước khi hết thời gian delay
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}