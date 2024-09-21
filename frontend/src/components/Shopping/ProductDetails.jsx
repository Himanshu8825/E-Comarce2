import { addToCart, fetchCartItems } from '@/store/Slices/Shopping/CartSlice';
import { setProductDetails } from '@/store/Slices/Shopping/ShoppingProductSlice';
import { StarIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { useToast } from '../ui/use-toast';

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { toast } = useToast();

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  const handleAddToCart = (getCurrentProductId , getTotalStock) => {
    const getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;

        if(getQuantity + 1 > getTotalStock){
          toast({
            title:`Only ${getQuantity} quantity can be added for this product `,
            variant: 'destructive',
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
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
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid  grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className=" aspect-square w-full object-cover cursor-pointer"
          />
        </div>

        <div className="">
          <div>
            <h1 className=" text-3xl font-bold">{productDetails?.title}</h1>
            <p className=" text-muted-foreground text-xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? 'line-through' : ''
              }`}
            >
              &#8377;{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                &#8377;{productDetails?.salePrice}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5 cursor-pointer ">
              <StarIcon className=" w-5 h-5 fill-primary" />
              <StarIcon className=" w-5 h-5 fill-primary" />
              <StarIcon className=" w-5 h-5 fill-primary" />
              <StarIcon className=" w-5 h-5 fill-primary" />
              <StarIcon className=" w-5 h-5 fill-primary" />
            </div>
            <span className=" text-muted-foreground">(4.5)</span>
          </div>

          <div className="mt-5 mb-2">
            {productDetails?.totalStock === 0 ? (
              <Button className=" w-full bg-teal-500 hover:bg-cyan-600 transition-all ease-in-out duration-700 opacity-60 cursor-not-allowed ">
                Out Of Stock
              </Button>
            ) : (
              <Button
                onClick={() => handleAddToCart(productDetails?._id , productDetails?.totalStock)}
                className=" w-full bg-teal-500 hover:bg-cyan-600 transition-all ease-in-out duration-700 "
              >
                Add to cart
              </Button>
            )}
          </div>
          <Separator />

          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4 mt-2">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="w-10 h-10 border">
                    SV
                  </AvatarFallback>
                </Avatar>

                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Suraj Verma</h3>
                  </div>
                  <div className="flex items-center gap-0.5 cursor-pointer ">
                    <StarIcon className=" w-5 h-5 fill-primary" />
                    <StarIcon className=" w-5 h-5 fill-primary" />
                    <StarIcon className=" w-5 h-5 fill-primary" />
                    <StarIcon className=" w-5 h-5 fill-primary" />
                    <StarIcon className=" w-5 h-5 fill-primary" />
                  </div>
                  <p className=" text-muted-foreground">Awesome Look</p>
                </div>
              </div>
            </div>

            <div className="flex mt-6 gap-2 mb-2 px-2 ">
              <Input placeholder="Add a review....." />
              <Button className="bg-green-500 hover:bg-green-600">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
