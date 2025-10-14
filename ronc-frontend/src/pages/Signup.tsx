import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface Country {
  name: string,
  flag: string,
  code: string,
  dial_code: string,
}

export default function Signup(props: { className: string }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => {
        setCountries(data)
        console.log(data);
    });
  }, []);

  return (
    <div className={`${props.className} w-full flex justify-center`}>
      <div className="w-[90vw] max-w-[500px] p-4 flex flex-col items-center justify-center bg-gray-200 gap-2">
        <h1 className='w-full text-left'>Create an account</h1>
        <div className="w-full bg-black h-1"></div>
        <div className="w-full flex flex-col justify-center bg-white p-2 rounded-md">
          <input type="text" placeholder="email" className="bg-transparent w-full"/>
        </div>
        <div className="w-full flex flex-col justify-center bg-white p-2 rounded-md">
          <input type="text" placeholder="username" className="bg-transparent w-full"/>
        </div>
        <div className="w-full flex items-center gap-2">
          <div className="flex flex-1 flex-col justify-center bg-white p-2 rounded-md">
            <input type="password" placeholder="password" className="bg-transparent w-full"/>
          </div>
          <Eye />
        </div>
        <div className="w-full flex flex-row justify-center gap-2">
          <div className="min-w-[49%] w-full flex flex-col justify-center bg-white p-2 rounded-md">
            <input type="text" placeholder="first name" className="bg-transparent w-full"/>
          </div>
          <div className="min-w-[49%] w-full flex flex-col justify-center bg-white p-2 rounded-md">
            <input type="text" placeholder="last name" className="bg-transparent w-full"/>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-2 flex-nowrap">
          <label htmlFor="country">Country</label>
          <select id="country" className="bg-transparent w-full bg-white p-2 rounded-md">
            {countries.map((country) => (
              <option key={country.code} value={country.code}>{country.name} {country.flag}</option>
            ))}
          </select>
        </div>
        <p className="w-full text-left">Phone number: </p>
        <div className="w-full flex flex-row justify-center items-center gap-2 flex-nowrap">
          <div className="bg-white p-2 rounded-md">
            {country == null ? <p>+40</p> : <p>{country.dial_code}</p>}
          </div>
          <div className="w-full flex flex-col justify-center bg-white p-2 rounded-md">
            <input type="text" placeholder="phone number" className="bg-transparent w-full"/>
          </div>
        </div>
        <div className="w-full p-2 bg-blue-500 rounded-md text-center text-white">
          <p>Signup</p>
        </div>
      </div>
    </div>
  );
}