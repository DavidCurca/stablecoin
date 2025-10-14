import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { vaidEmail } from "./utils";
import { Link, useNavigate } from "react-router";

interface Country {
  name: string,
  flag: string,
  code: string,
  dial_code: string,
}

export default function Signup(props: { className: string }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country>({
    name: "Romania",
    flag: "🇷🇴",
    code: "RO",
    dial_code: "+40",
  });
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => {
        setCountries(data)
        console.log(data);
    });
    const token = localStorage.getItem('token');
    if(token){
      navigate('/account');
    }
  }, []);

  const validateInput = () => {
    if(email == "" || username == "" || password == "" || firstName == "" || lastName == "" || phoneNumber == "" || country == null){
      toast.error("Please fill in all fields");
      return false;
    }
    if(!vaidEmail(email)){
      toast.error("Invalid email");
      return false;
    }
    return true;
  }

  useEffect(() => {
    if(phoneNumber.length > 0){
      // allow only digits and one space between digits
      const pattern = /^\d+(?: ?\d+)* ?$/;
      if(!pattern.test(phoneNumber)){
        setPhoneNumber(phoneNumber.slice(0, -1));
      }
    }
  }, [phoneNumber]);
  
  const handleSignup = async () => {
    const response = await fetch('/api/user/create', {
      method: 'POST',
      body: JSON.stringify({ 
        email: email, 
        username: username, 
        password: password, 
        firstname: firstName, 
        lastname: lastName, 
        phone: phoneNumber, 
        country: country.code,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    if(data.message && data.session == undefined){
      toast.error(data.message);
    } else {
      toast.success("Account created successfully");
      localStorage.setItem('token', data.session);
      setTimeout(() => {navigate('/account'); window.location.reload();}, 1000);
    }
  };

  return (
    <div className={`${props.className} w-full flex justify-center`}>
      <div className="rounded-md w-[90vw] max-w-[500px] p-4 flex flex-col items-center justify-center bg-gray-200 gap-2">
        <h1 className='w-full text-left'>Create an account</h1>
        <div className="w-full bg-black h-1"></div>
        <div className="w-full flex flex-col justify-center bg-white p-2 rounded-md">
          <input type="text" placeholder="email" className="bg-transparent w-full" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="w-full flex flex-col justify-center bg-white p-2 rounded-md">
          <input type="text" placeholder="username" className="bg-transparent w-full" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="w-full flex items-center gap-2">
          <div className="flex flex-1 flex-col justify-center bg-white p-2 rounded-md">
            <input type={visible ? "text" : "password"} placeholder="password" className="bg-transparent w-full" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
         {visible ? <Eye onClick={() => setVisible(!visible)}/> : <EyeOff onClick={() => setVisible(!visible)}/>}
        </div>
        <div className="w-full flex flex-row justify-center gap-2">
          <div className="min-w-[49%] w-full flex flex-col justify-center bg-white p-2 rounded-md">
            <input type="text" placeholder="first name" className="bg-transparent w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <div className="min-w-[49%] w-full flex flex-col justify-center bg-white p-2 rounded-md">
            <input type="text" placeholder="last name" className="bg-transparent w-full" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-2 flex-nowrap">
          <label htmlFor="country">Country</label>
          <select id="country" className="bg-transparent w-full bg-white p-2 rounded-md" value={country?.code} onChange={
              (e) => setCountry(countries.find(country => country.code === e.target.value) || country)
            }>
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
            <input type="text" placeholder="phone number" className="bg-transparent w-full" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
          </div>
        </div>
        <div className="w-full p-2 bg-blue-500 rounded-md text-center text-white cursor-pointer" onClick={handleSignup}>
          <p>Signup</p>
        </div>
        <p className="font-bold w-full text-left">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </div>
    </div>
  );
}