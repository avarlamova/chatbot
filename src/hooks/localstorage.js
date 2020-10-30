import {React, useEffect, useState} from 'react'

export default function useLocalStorage(key, initialValue) {
    
  const [value, setValue] = useState(()=> {
    const jsonvalue = localStorage.getItem(key)
    if (jsonvalue!==null) {
      if (jsonvalue != null) {
        if (jsonvalue === "undefined") {
          return null;
        } else {
          return JSON.parse(jsonvalue);
        }
      }
      if (typeof initialValue === "function") {
        return initialValue();
      }
        else {
          return initialValue
        }
  }
});

  useEffect(()=> {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]

}
  

