import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { useRef } from 'react';

const ImageUpload = ({ imageFile, setImageFile, imageUrl, setImageUrl }) => {
  const inputRef = useRef(null);

  const changeHandler = async (e) => {
    console.log(e.target.files);

    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    // console.log('Drag over');
  };

  const dropHandler = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
    // inputRef.current.value = null;
  };

  const imageRemoveHandler = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className=" w-full max-w-md mx-auto">
      <Label className=" text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
        className=" border-2 border-dashed rounded-lg p-4 mt-4"
      >
        <Input
          className="hidden"
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={changeHandler}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex  flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className=" w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className=" text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className=" text-muted-foreground hover:text-red-600 "
              onClick={imageRemoveHandler}
            >
              <XIcon className=" w-4 h-4" />
              <span className=" sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
