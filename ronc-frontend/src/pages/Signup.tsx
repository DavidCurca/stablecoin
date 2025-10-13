import { useEffect, useState } from "react";

interface Country {
  name: string,
  flag: string,
  code: string,
  dial_code: string,
}

export default function Signup(props: { className: string }) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  return (
    <div className={`${props.className}`}>
      
    </div>
  );
}