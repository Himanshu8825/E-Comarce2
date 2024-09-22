import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ProductDetails, ShopProductTile } from '@/Index';
import { getFeatureImages } from '@/store/Slices/Common/CommonSlice';
import { addToCart, fetchCartItems } from '@/store/Slices/Shopping/CartSlice';
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from '@/store/Slices/Shopping/ShoppingProductSlice';
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Addidas from '../../assets/adidas.ico';
import BannerOne from '../../assets/banner-1.webp';
import BannerTwo from '../../assets/banner-2.webp';
import BannerThree from '../../assets/banner-3.webp';
import HnM from '../../assets/h.ico';
import Levis from '../../assets/levis.ico';
import Nike from '../../assets/nike.ico';
import Puma from '../../assets/puma.ico';
import Zara from '../../assets/zara.ico';

//! Define category and brand data with associated icons and images
const categoriesWithIcon = [
  { id: 'men', label: 'Men', icon: ShirtIcon },
  { id: 'women', label: 'Women', icon: CloudLightning },
  { id: 'kids', label: 'Kids', icon: BabyIcon },
  { id: 'accessories', label: 'Accessories', icon: WatchIcon },
  { id: 'footwear', label: 'Footwear', icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: 'nike', label: 'Nike', icon: 'image', image: Nike },
  { id: 'adidas', label: 'Adidas', icon: 'image', image: Addidas },
  { id: 'puma', label: 'Puma', icon: 'image', image: Puma },
  { id: 'levi', label: "Levi's", icon: 'image', image: Levis },
  { id: 'zara', label: 'Zara', icon: 'image', image: Zara },
  { id: 'h&m', label: 'H&M', icon: 'image', image: HnM },
];

//! Main component for the Shopping Home page
const ShoppingHome = () => {
  //! State to track current slide index for the banner
  const [currentSlide, setCurrentSlide] = useState(0);

  //! Fetch product list and product details from the Redux store
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );

  //! State to control the visibility of product details dialog
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();

  //! Define the banner slides (images)
  const slides = [BannerOne, BannerTwo, BannerThree];

  //! Get the user from the auth state
  const { user } = useSelector((state) => state.auth);
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const navigate = useNavigate();
  const { toast } = useToast();

  //! Handle navigation to the listing page based on selected category or brand
  const handleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  };

  //! Show product details dialog when productDetails state changes
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  //! Automatically switch slides every 2 seconds
  //! Automatically switch slides every 2 seconds
  useEffect(() => {
    if (featureImageList.data && featureImageList.data.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featureImageList.data.length);
      }, 2000);

      //! Clear the timer when the component unmounts
      return () => clearInterval(timer);
    }
  }, [featureImageList.data]);

  //! Fetch product details based on the selected product ID
  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  //! Handle adding a product to the cart and show a toast notification
  const handleAddToCart = async (getCurrentProductId) => {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      //! If the add-to-cart action is successful, show a success toast
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: data?.payload?.message,
        });
      } else {
        //! If the action fails, show an error toast
        toast({
          title: data?.payload?.message,
          variant: 'destructive',
        });
      }
    });
  };

  //! Fetch all filtered products on component mount
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: 'price-lowtohigh',
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  //! Render the Shopping Home page UI
  return (
    <div className=" flex flex-col min-h-screen">
      {/* Banner section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList.data && featureImageList.data.length > 0
          ? featureImageList.data.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={` ${
                  index === currentSlide ? ' opacity-100 ' : ' opacity-0'
                } absolute   top-0 left-0 w-full object-cover transition-opacity duration-700`}
              />
            ))
          : null}
        {/* Left slide button */}
        <Button
          variant="outline"
          size="icon"
          className=" absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className=" w-4 h-4" />
        </Button>
        {/* Right slide button */}
        <Button
          variant="outline"
          size="icon"
          className=" absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          <ChevronRightIcon className=" w-4 h-4" />
        </Button>
      </div>

      {/* Category section */}
      <section className=" py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className=" text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((item, index) => (
              <Card
                key={index}
                className=" cursor-pointer hover:shadow-lg transition-shadw hover:bg-cyan-200 transition-all ease-in-out duration-700  "
                onClick={() => handleNavigateToListingPage(item, 'category')}
              >
                <CardContent className=" flex flex-col items-center justify-center p-6 ">
                  <item.icon className="w-12 h-12 mb-4 text-primary " />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
        {brandsWithIcon.map((item, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shdow hover:bg-cyan-200 transition-all ease-in-out duration-700"
            onClick={() => handleNavigateToListingPage(item, 'brand')}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              {item.icon === 'image' ? (
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-20 h-18 mb-4 rounded-xl"
                />
              ) : (
                <item.icon className="w-12 h-12 mb-4 text-primary" />
              )}
              <span className="font-bold">{item.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured products section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className=" text-3xl font-bold text-center mb-8">
            Feature products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((item) => (
                  <ShopProductTile
                    key={item._id}
                    product={item}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      {/* Product details dialog */}
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
