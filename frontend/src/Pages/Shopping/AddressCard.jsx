import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
}) => {
  return (
    <Card>
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex p-4 justify-between items-center ">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="h-8 bg-yellow-400 hover:bg-yellow-600"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="h-8 bg-red-600 hover:bg-red-700"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
