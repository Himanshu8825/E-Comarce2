import { resetTokenAndCredentials } from '@/store/Slices/authSlice';
import { AlignJustify, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    // dispatch(logoutUser()).then((data) => {
    //   if (data?.payload?.success) {
    //     toast({
    //       title: data?.payload?.message,
    //     });
    //   }
    // });

    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate('/auth/signin');
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        onClick={() => setOpen(true)}
        className=" lg:hidden sm:block bg-[#7D0DC3] hover:bg-[#6805a5]"
      >
        <AlignJustify />
        <span className=" sr-only">Toggle Menu</span>
      </Button>

      <div className=" flex flex-1 justify-end ">
        <Button
          onClick={logoutHandler}
          className="bg-red-600 hover:bg-red-700 hover:text-white text-white transition duration-500 ease-in-out"
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
