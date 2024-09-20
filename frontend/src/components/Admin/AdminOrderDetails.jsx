import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from '@/store/Slices/Admin/AdminOrderSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../common/Form';
import { Badge } from '../ui/badge';
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { useToast } from '../ui/use-toast';

const AdminOrderDetails = ({ orderDetails }) => {
  const initialFormData = {
    status: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { userDetails } = useSelector((state) => state.adminOrder);

  const statusUpdateHandler = (event) => {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
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
              <Badge
                className={`py-1 px-3 capitalize cursor-pointer ${
                  orderDetails?.orderStatus === 'confirmed'
                    ?  'bg-purple-500 hover:bg-purple-600'
                    : orderDetails?.orderStatus === 'rejected'
                    ? 'bg-red-600 hover:bg-red-700'
                    : orderDetails?.orderStatus === 'inShipping'
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : orderDetails?.orderStatus === 'delivered'
                    ? 'bg-green-500 hover:bg-green-600'
                    : orderDetails?.orderStatus === 'pending'
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : orderDetails?.orderStatus === 'inProcess'
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : 'bg-gray-500'
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
              <span className=" capitalize text-lg font-medium text-blue-700 cursor-pointer">
                User :
                <span className=" text-black"> {userDetails?.username}</span>
              </span>
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
