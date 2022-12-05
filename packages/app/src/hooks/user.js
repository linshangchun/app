import { useEffect, useState } from 'react';

export const useInfo = ({ name, age }) => {
  const [realAge, setRealAge] = useState(age);
  useEffect(() => {
    setRealAge(age + 10);
  }, []);
  return [name, realAge, setRealAge];
};
