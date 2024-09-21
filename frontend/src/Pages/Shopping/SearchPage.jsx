import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ProductDetails, ShopProductTile } from '@/Index';
import { addToCart, fetchCartItems } from '@/store/Slices/Shopping/CartSlice';
import {
  getSearchResults,
  resetSearchResults,
} from '@/store/Slices/Shopping/SearchSlice';
import { fetchProductDetails } from '@/store/Slices/Shopping/ShoppingProductSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shoppingProducts);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleAddToCart = async (getCurrentProductId, getTotalStock) => {
    const getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;

        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this product `,
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


  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  useEffect(() => {
    if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
      setLoading(true);
      const timer = setTimeout(() => {
        setSearchParams(new URLSearchParams(`keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setSearchParams(new URLSearchParams(`keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8 poppins-medium">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
            className="py-6"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="spinner" role="status">
            <span className="visually-hidden sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {searchResults && searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {searchResults.map((item) => (
                <ShopProductTile
                  handleAddToCart={handleAddToCart}
                  handleGetProductDetails={handleGetProductDetails}
                  product={item}
                  key={item._id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-5xl font-extrabold">No Results Found</span>
              <p className="text-xl text-gray-500 mt-2">
                Try adjusting your search or check for typos.
              </p>
            </div>
          )}
        </>
      )}
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default SearchPage;
