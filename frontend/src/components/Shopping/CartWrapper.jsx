import { CartItemContent } from '@/Index';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const CartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <CartItemContent cartItem={item} key={item.productId} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className=" font-bold">Total</span>
          <span className=" font-bold">&#8377;{totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate('/shop/checkout');
          setOpenCartSheet(false);
        }}
        className=" bg-green-500 hover:bg-green-600 mt-6 w-full"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default CartWrapper;
