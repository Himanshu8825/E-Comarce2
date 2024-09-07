import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

const ImageUpload = ({
  imageFile,
  setImageFile,
  imageUrl,
  setImageUrl,
  setImageLoader,
  imageLoader,
  isEditMode,
}) => {
  const inputRef = useRef(null);
  const { toast } = useToast();

  const changeHandler = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  };

  const imageRemoveHandler = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
      toast({
        title: 'Image Removed ',
        variant: 'destructive',
      });
    }
  };

  const webUrl = 'http://localhost:3000/admin/products/upload-image';

  const uploadImageToCloudinary = async () => {
    setImageLoader(true);
    try {
      const data = new FormData();
      data.append('my_file', imageFile);

      const res = await axios.post(webUrl, data);
      // console.log('Response:', res);

      if (res.data.success) {
        setImageUrl(res?.data?.result?.url);
        toast({
          title: res?.data?.message,
        });
        setImageLoader(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      toast({
        title: 'Error uploading image',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);



  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
        className={`${isEditMode ? ' opacity-40' : ''} border-2 border-dashed rounded-lg p-4 mt-4`}
      >
        <Input
          className="hidden"
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={changeHandler}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={` ${
              isEditMode ? ' cursor-not-allowed' : ''
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : imageLoader ? (
          <Skeleton className="h-10 bg-gray-200" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-red-600"
              onClick={imageRemoveHandler}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
