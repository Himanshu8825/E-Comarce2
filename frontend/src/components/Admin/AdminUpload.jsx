import { ImageUpload } from '@/Index';
import {
  addFeatureImage,
  getFeatureImages,
} from '@/store/Slices/Common/CommonSlice';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const AdminUpload = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoader, setImageLoader] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    setLoading(true);
    dispatch(addFeatureImage(imageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setLoading(false);
        setImageFile(null);
        setImageUrl('');
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload,
          variant: 'destructive',
        });
      }
    });
  }

  console.log("feture image: " , featureImageList);


  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        imageLoader={imageLoader}
        setImageLoader={setImageLoader}
      />
      <Button
        onClick={handleUploadFeatureImage}
        className="mt-5 bg-teal-500 hover:bg-teal-600 transition-all ease-in-out duration-500 w-full"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </div>
        ) : (
          'Upload Image'
        )}
      </Button>
      <div className="flex flex-col gap-4 mt-5">

        {featureImageList.data && featureImageList.data.length > 0
          ? featureImageList.data.map((featureImgItem) => (
              <div className="relative">
                <img
                  src={featureImgItem?.image}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminUpload;
