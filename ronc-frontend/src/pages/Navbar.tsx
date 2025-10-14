import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import fullLogo from "../assets/roncoin_logo_full.svg";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import UserDropdown from "./user-dropdown";

export default function Navbar() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token == null || token == undefined || token == "") {
      setAuth(false);
      return;
    }
    fetch("/api/user/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.status);
        if(response.status !== 200){
          setAuth(false);
          localStorage.removeItem("token");
          navigate("/");
          return;
        }
        return response.json();
      })
      .then((data) => {
        setAuth(true);
        setUsername(data.username);
      });
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-1000 bg-background/80 backdrop-blur-md border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <img
          src={fullLogo}
          alt="Roncoin Logo"
          className="w-[30vw] max-w-[10rem] cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="sections flex items-center gap-4">
          <p className="cursor-pointer" onClick={() => navigate("/whitepaper")}>
            Whitepaper
          </p>
          <p className="cursor-pointer" onClick={() => navigate("/#about")}>
            About
          </p>
          <p
            className="cursor-pointer"
            onClick={() => navigate("/transparency")}
          >
            Transparency
          </p>
          <p className="cursor-pointer" onClick={() => navigate("/bridge")}>
            Bridge
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          {auth ? <UserDropdown username={username} />
            : <Button onClick={() => navigate('/signup')}>
            Get Started
          </Button> }
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden dropdown-menu-trigger">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-1001">
              <DropdownMenuItem onClick={() => navigate("/whitepaper")}>
                <p>Whitepaper</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/about")}>
                <p>About</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/transparency")}>
                <p>Transparency</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/bridge")}>
                <p>Bridge</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
