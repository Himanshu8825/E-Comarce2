import { AlignJustify, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

const AdminHeader = ({setOpen}) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={()=>setOpen(true)} className=" lg:hidden sm:block bg-[#7D0DC3] hover:bg-[#6805a5]">
        <AlignJustify />
        <span className=" sr-only">Toggle Menu</span>
      </Button>

      <div className=" flex flex-1 justify-end ">
        <Button
          className="hover:bg-[#7d0dc3c3] hover:text-white transition duration-500 ease-in-out"
          variant="outline"
        >
          <LogOut className="mr-1 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
