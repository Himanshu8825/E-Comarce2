import {
  deleteCartItems,
  updateCartItems,
} from '@/store/Slices/Shopping/CartSlice';
import { Minus, Plus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const CartItemContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { productList } = useSelector((state) => state.shoppingProducts);
  const { toast } = useToast();

  const handleCartItemDelete = async (getCartItem) => {
    dispatch(
      deleteCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive',
        });
      }
    });
  };

  const handleUpdateQuantity = async (getCartItem, typeOfAction) => {
    if (typeOfAction === 'plus') {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getTotalStock} quantity can be added for this item`,
              variant: 'destructive',
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: getCartItem.productId,
        quantity:
          typeOfAction === 'plus'
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className=" w-20 h-20 object-cover rounded cursor-pointer"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            className=" w-8 h-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, 'minus')}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className=" w-8 h-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, 'plus')}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className=" font-semibold">
          &#8377;
          {(
            (cartItem?.salePrice > 0 ? cartItem.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className=" cursor-pointer hover:text-red-700 mt-1  "
          size={20}
        />
      </div>
    </div>
  );
};

export default CartItemContent;
