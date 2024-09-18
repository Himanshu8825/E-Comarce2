import { Button } from '@/components/ui/button';
import { Address, CartItemContent } from '@/Index';
import { useSelector } from 'react-redux';
import img from '../../assets/account.jpg';

const ShoppingCheckOut = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
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
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="Banner"
          className=" h-full w-full object-cover object-center"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />

        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <CartItemContent key={item.productId} cartItems={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className=" font-bold">Total</span>
              <span className=" font-bold">&#8377;{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button className=" bg-teal-500 hover:bg-teal-600 transition-all ease-in-out duration-500 w-full">
              Checkout with paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckOut;
