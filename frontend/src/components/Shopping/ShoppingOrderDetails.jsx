import { useSelector } from 'react-redux';
import { Badge } from '../ui/badge';
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const ShoppingOrderDetails = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);

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
                className={`py-1 px-3 capitalize cursor-pointer ${
                  orderDetails?.orderStatus === 'confirmed'
                    ? 'bg-purple-500 hover:bg-purple-600'
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
              <span className=" capitalize">{user?.username}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetails;
