import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import fullLogo from "./assets/roncoin_logo_full.svg";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-1000 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <img src={fullLogo} alt="Roncoin Logo" className="w-[30vw] max-w-[10rem]" />
        <div className="sections flex items-center gap-4">
          <p className='cursor-pointer'>Whitepaper</p>
          <p className='cursor-pointer'>About</p>
          <p className='cursor-pointer'>Transparency</p>
          <p className='cursor-pointer'>Bridge</p>
        </div>
        <div className='flex flex-row items-center justify-center gap-5'>
          <Button>
            Get Started
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className='hidden dropdown-menu-trigger'>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='z-1001'>
              <DropdownMenuItem>
                <p>Whitepaper</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p>About</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p>Transparency</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p>Bridge</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}