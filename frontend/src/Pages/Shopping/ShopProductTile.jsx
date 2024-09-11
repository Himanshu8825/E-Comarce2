import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { brandOptionsMap, categoryOptionsMap } from '@/config/Index';

const ShopProductTile = ({ product, handleGetProductDetails }) => {
  return (
    <Card className=" w-full max-w-sm mx-auto">
      <div
        className=" overflow-hidden"
        onClick={() => handleGetProductDetails(product?._id)}
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[200px] object-cover rounded-t-lg transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
          />

          {product?.salePrice > 0 ? (
            <Badge className=" absolute top-2 left-2 bg-red-600 hover:bg-red-700">
              Sale
            </Badge>
          ) : null}
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span className=" text-[16px] text-muted-foreground">
                {categoryOptionsMap[product?.category]}
              </span>
              <span className=" text-[16px] text-muted-foreground">
                {brandOptionsMap[product?.brand]}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.salePrice > 0 ? ' line-through' : ''
                } text-lg font-semibold text-primary`}
              >
                &#8377;{product.price}
              </span>

              {product.salePrice > 0 ? (
                <span className="text-lg font-semibold text-primary">
                  &#8377;{product.salePrice}
                </span>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <Button className=" w-full ">Add to cart</Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ShopProductTile;
