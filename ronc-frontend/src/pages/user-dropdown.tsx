import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOut, Receipt, Settings, User } from "lucide-react";
import { useNavigate } from "react-router";

export default function UserDropdown(props: { username: string }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <p className="flex items-center gap-2"><User /> {props.username}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-1000">
        <DropdownMenuItem>
          <p className="flex items-center gap-2" onClick={handleLogout}>Logout <LogOut /></p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p className="flex items-center gap-2" onClick={() => navigate('/receipts')}>Receipts <Receipt /></p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p className="flex items-center gap-2" onClick={() => navigate('/settings')}>Settings <Settings /></p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}