import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Address, CartItemContent } from '@/Index';
import { createNewOrder } from '@/store/Slices/Shopping/ShoppingOrderSlice';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import img from '../../assets/account.jpg';

const ShoppingCheckOut = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { toast } = useToast();

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

  const handleInitiatePaypalPayment = async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Your cart is empty , Please add product to procced  ',
        variant: 'destructive',
      });
    }

    if (currentSelectedAddress === null) {
      toast({
        title: 'Please select one address to procced ',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      setLoading(false);
      if (data?.payload?.success) {
        // dispatch(fetchAllAddresses(user?.id));
        setIsPaymentStart(true);
        toast({
          title: data?.payload?.message,
        });
      } else {
        setIsPaymentStart(false);
        toast({
          title: data?.payload?.message,
          variant: 'destructive',
        });
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

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
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />

        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <CartItemContent key={item.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className=" font-bold">Total</span>
              <span className=" font-bold">&#8377;{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePaypalPayment}
              className=" bg-teal-500 hover:bg-teal-600 transition-all ease-in-out duration-500 w-full"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </div>
              ) : (
                'Checkout with PayPal'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckOut;
