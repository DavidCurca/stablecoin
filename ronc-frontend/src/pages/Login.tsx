import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

export default function Login(props: { className: string }) {
  const [email, setEmail] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/account");
    }
  }, []);

  const handleLogin = () => {
    fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.session != null) {
          localStorage.setItem("token", data.session);
          toast.success("Logged in successfully");
          setTimeout(() => {
            window.location.reload();
            navigate("/account");
          }, 1000);
        } else {
          toast.error(data.message || "Something went wrong");
        }
      });
  };

  return (
    <div className={`${props.className} w-full flex justify-center`}>
      <div className="rounded-md w-[90vw] max-w-[500px] p-4 flex flex-col items-center justify-center bg-gray-200 gap-2">
        <h1 className="w-full text-left">Login</h1>
        <div className="w-full bg-black h-1"></div>
        <div className="w-full flex flex-col justify-center bg-white p-2 rounded-md">
          <input
            type="text"
            placeholder="email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent w-full"
          />
        </div>
        <div className="w-full flex items-center gap-2">
          <div className="flex flex-1 flex-col justify-center bg-white p-2 rounded-md">
            <input
              type={visible ? "text" : "password"}
              placeholder="password"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full"
            />
          </div>
          {visible ? <Eye onClick={() => setVisible(!visible)} /> : <EyeOff onClick={() => setVisible(!visible)} />}
        </div>
        <div
          onClick={handleLogin}
          className="w-full p-2 bg-blue-500 rounded-md text-center text-white"
        >
          <p>Continue</p>
        </div>
      </div>
    </div>
  );
}
