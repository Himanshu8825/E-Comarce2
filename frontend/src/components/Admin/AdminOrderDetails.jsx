import { useState } from 'react';
import { useSelector } from 'react-redux';
import Form from '../common/Form';
import { Badge } from '../ui/badge';
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const AdminOrderDetails = ({ orderDetails }) => {
  const initialFormData = {
    status: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);

  console.log("Admin logged in: ", user);  // Admin info
  console.log("Customer info: ", orderDetails);  // Customer info (normal user)



  const statusUpdateHandler = (e) => {
    e.preventDefault();
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID </p>
            <Label>{orderDetails?._id}</Label>
          </div>

          <div className="flex items-center justify-between ">
            <p className="font-medium">Order Date</p>
            <Label> {orderDetails?.orderDate.split('T')[0]}</Label>
          </div>

          <div className="flex items-center justify-between ">
            <p className="font-medium">Order Price</p>
            <Label>&#8377; {orderDetails?.totalAmount}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>

          <div className="flex items-center justify-between ">
            <p className="font-medium">Order Status</p>
            <Label>
              {' '}
              <Badge
                className={`capitalize  py-1 px-3  ${
                  orderDetails?.orderStatus === 'pending'
                    ? 'bg-red-500 hover:bg-red-600 '
                    : orderDetails?.orderStatus === 'confirmed'
                    ? 'bg-green-500 hover:bg-green-600'
                    : ''
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between"
                    >
                      <span>Title: {item?.title}</span>
                      <span>Quantity: {item?.quantity}</span>
                      <span>Price: &#8377; {item?.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span className=" capitalize">{user?.username}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <Form
            formControls={[
              {
                label: 'Order Status',
                name: 'status',
                componentType: 'select',
                options: [
                  { id: 'pending', label: 'Pending' },
                  { id: 'inProcess', label: 'In Process' },
                  { id: 'inShipping', label: 'In Shipping' },
                  { id: 'delivered', label: 'Delivered' },
                  { id: 'rejected', label: 'Rejected' },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Update Status'}
            onSubmit={statusUpdateHandler}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;
