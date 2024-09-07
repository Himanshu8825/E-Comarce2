import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

const AdminProductTile = ({
  product,
  setCreateProduct,
  setFormData,
  setCurrentEditedId,
  deleteHandler,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto ">
      <div className="overflow-hidden shadow-lg">
        <div className="relative group">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[200px] object-cover rounded-t-lg transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
          />
        </div>
        <CardContent>
          <h2 className=" text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={` ${
                product?.salePrice > 0 ? ' line-through' : ''
              } text-lg font-semibold text-primary`}
            >
              &#8377;{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className=" text-lg font-bold">
                &#8377;{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className=" flex justify-between items-center">
          <Button
            onClick={() => {
              setCreateProduct(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            className="h-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteHandler(product._id)}
            className="h-8 bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
