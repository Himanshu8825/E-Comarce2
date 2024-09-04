import { BadgeCheck, LayoutDashboard, ShoppingBasket } from 'lucide-react';
import { Fragment } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const adminSidebarMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboard />,
    },
    {
      id: 'products',
      label: 'Products',
      path: '/admin/products',
      icon: <ShoppingBasket />,
    },
    {
      id: 'orders',
      label: 'Orders',
      path: '/admin/orders',
      icon: <BadgeCheck />,
    },
  ];

  const MenuItems = ({ setOpen }) => {
    return (
      <nav className="mt-8 flex-col flex gap-2 poppins-medium ">
        {adminSidebarMenuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground text-lg hover:bg-muted hover:text-foreground"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    );
  };

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className=" border-b">
              <SheetTitle className=" flex gap-2 mt-5 mb-4">
                <MdAdminPanelSettings className="text-3xl" />
                <h1 className="text-2xl font-medium ">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <MdAdminPanelSettings className="text-3xl" />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
