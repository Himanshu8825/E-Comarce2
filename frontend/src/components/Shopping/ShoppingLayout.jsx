import { Footer, ShoppingHeader } from '@/Index';
import { Outlet } from 'react-router-dom';

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* Comman Header */}

      <ShoppingHeader />

      <main className="flex flex-col w-full">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default ShoppingLayout;
