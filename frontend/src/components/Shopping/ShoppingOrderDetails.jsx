import { useState } from 'react';
import Form from '../common/Form';
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const ShoppingOrderDetails = () => {
  const initialFormData = {
    status: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const statusUpdateHandler = (e) => {
    e.preventDefault();
  };
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>

          <div className="flex items-center justify-between ">
            <p className="font-medium">Order Date</p>
            <Label>12/3/2004</Label>
          </div>

          <div className="flex items-center justify-between ">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>

          <div className="flex items-center justify-between ">
            <p className="font-medium">Order Price</p>
            <Label>&#8377; 2000</Label>
          </div>

          <div className="flex items-center justify-between ">
            <p className="font-medium">Order Status</p>
            <Label>Completed</Label>
          </div>
        </div>
        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>&#8377; 2000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Jhon Doe</span>
              <span> Address </span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone Number</span>
              <span>Notes</span>
            </div>
          </div>
        </div>


      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetails;
