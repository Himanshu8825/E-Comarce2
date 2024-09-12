import {
  deleteCartItems,
  updateCartItems,
} from '@/store/Slices/Shopping/CartSlice';
import { Minus, Plus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const CartItemContent = ({ cartItems }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const handleCartItemDelete = async (getCartItem) => {
    dispatch(
      deleteCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        // dispatch(fetchCartItems(user?.id));
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
        src={cartItems?.image}
        alt={cartItems?.title}
        className=" w-20 h-20 object-cover rounded cursor-pointer"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItems.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            className=" w-8 h-8 rounded-full"
            size="icon"
            disabled={cartItems?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItems, 'minus')}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems.quantity}</span>
          <Button
            variant="outline"
            className=" w-8 h-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItems, 'plus')}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className=" font-semibold">
          &#8377;
          {(
            (cartItems?.salePrice > 0 ? cartItems.salePrice : cartItems.price) *
            cartItems.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItems)}
          className=" cursor-pointer hover:text-red-700 mt-1  "
          size={20}
        />
      </div>
    </div>
  );
};

export default CartItemContent;
