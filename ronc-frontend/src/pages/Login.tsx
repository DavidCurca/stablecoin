import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface Country {
  name: string,
  flag: string,
  code: string,
  dial_code: string,
}

export default function Login(props: { className: string }) {
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
        <h1 className='w-full text-left'>Login</h1>
        <div className="w-full bg-black h-1"></div>
        <div className="w-full flex flex-col justify-center bg-white p-2 rounded-md">
          <input type="text" placeholder="email or username" className="bg-transparent w-full"/>
        </div>
        <div className="w-full flex items-center gap-2">
          <div className="flex flex-1 flex-col justify-center bg-white p-2 rounded-md">
            <input type="password" placeholder="password" className="bg-transparent w-full"/>
          </div>
          <Eye />
        </div>
        <div className="w-full p-2 bg-blue-500 rounded-md text-center text-white">
          <p>Continue</p>
        </div>
      </div>
    </div>
  );
}