// AdminProduct.js
import Form from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { addProductFormElements } from '@/config/Index';
import { AdminProductTile, ImageUpload } from '@/Index';
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from '@/store/Slices/Admin/ProductSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AdminProduct = () => {
  const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: 0,
    salePrice: '',
    totalStock: '',
  };

  const [createProduct, setCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState(null);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoader, setImageLoader] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  // Handles the form submission for adding or editing a product
  const submitHandler = async (e) => {
    e.preventDefault();

    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setCreateProduct(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
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
    } else {
      const response = await dispatch(
        addNewProduct({
          ...formData,
          image: imageUrl,
        })
      );

      if (response?.payload?.success) {
        dispatch(fetchAllProducts());
        setCreateProduct(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title: response?.payload?.message,
        });
      } else {
        toast({
          title: response?.payload?.message,
          variant: 'destructive',
        });
      }
    }
  };

  // Fetch all products when the component is mounted
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleAddProductClick = () => {
    setFormData(initialFormData);
    setCurrentEditedId(null);
    setCreateProduct(true);
  };

  return (
    <>
      <div className="flex justify-end mb-5 w-full">
        <Button
          className="bg-[#7d0dc3c3] hover:bg-[#8e54b2] hover:text-white text-white transition duration-500 ease-in-out"
          variant="outline"
          onClick={handleAddProductClick}
        >
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <AdminProductTile
                key={product._id}
                setCreateProduct={setCreateProduct}
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                product={product}
              />
            ))
          : null}
      </div>
      <Sheet
        open={createProduct}
        onOpenChange={(open) => {
          setCreateProduct(open);
          if (!open) {
            setCurrentEditedId(null);
            setFormData(initialFormData);
          }
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? 'Edit Product' : 'Add New Product'}
            </SheetTitle>
          </SheetHeader>

          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            imageLoader={imageLoader}
            setImageLoader={setImageLoader}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <Form
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? 'Update' : 'Create'}
              onSubmit={submitHandler}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProduct;
