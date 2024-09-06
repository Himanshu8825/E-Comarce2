import Form from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { addProductFormElements } from '@/config/Index';
import { ImageUpload } from '@/Index';

import { useState } from 'react';

const AdminProduct = () => {
  const [createProduct, setCreateProduct] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: 0,
    salePrice: '',
    totalStock: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoader, setImageLoader] = useState(false);

  const submitHandler = async () => {
    e.preventDefault();
    console.log('Submit ' + formData);
  };

  return (
    <>
      <div className="flex justify-end mb-5 w-full">
        <Button
          className="bg-[#7d0dc3c3] hover:bg-[#8e54b2] hover:text-white text-white transition duration-500 ease-in-out"
          variant="outline"
          onClick={() => setCreateProduct(!createProduct)}
        >
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={createProduct}
          onOpenChange={() => setCreateProduct(false)}
        >
          <SheetContent side="right" className=" overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>

            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              imageLoader={imageLoader}
              setImageLoader={setImageLoader}
            />

            <div className="py-6">
              <Form
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                buttonText="Create"
                onSubmit={submitHandler}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default AdminProduct;
