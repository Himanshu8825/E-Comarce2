import { shoppingViewHeaderMenuItems } from '@/config/Index';
import { CartWrapper } from '@/Index';
import { logoutUser, resetTokenAndCredentials } from '@/store/Slices/authSlice';
import { fetchCartItems } from '@/store/Slices/Shopping/CartSlice';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { House, LogOutIcon, Menu, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Label } from '../ui/label';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useToast } from '../ui/use-toast';

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigate = (getCurrentMenuItem) => {
    sessionStorage.removeItem('filters');
    const currentFilter =
      getCurrentMenuItem.id !== 'home' &&
      getCurrentMenuItem.id !== 'products' &&
      getCurrentMenuItem.id !== 'search'
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));

    location.pathname.includes('listing') && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  };
  return (
    <nav className=" poppins-medium flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((item, index) => (
        <Label
          key={item.id}
          className=" text-sm font-medium hover:text-blue-700 cursor-pointer"
          onClick={() => handleNavigate(item)}
        >
          {item.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

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
    navigate('/auth/signin')
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 poppins-medium">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className=" relative"
        >
          <ShoppingCart className=" w-6 h-6" />
          <spam className="absolute top-[-4px] right-[4px] font-extrabold text-md">
            {cartItems?.items?.length || ''}
          </spam>
          <span className=" sr-only">User Cart</span>
        </Button>
        <CartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className=" bg-black">
            <AvatarFallback className="bg-black text-white font-bold cursor-pointer">
              {user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as
            <span className=" text-lg font-medium"> {user?.username}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => navigate('/shop/account')}
            className="cursor-pointer"
          >
            <FaRegUserCircle className="w-4 h-4 mr-2 " />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={logoutHandler}>
            <LogOutIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className=" sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className=" font-bold">E-Comarce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className=" sr-only">Toggle Header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className=" hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
