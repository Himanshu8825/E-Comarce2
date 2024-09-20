import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ShoppingOrderDetails } from '@/Index';
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from '@/store/Slices/Shopping/ShoppingOrderSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Orders = () => {
  const [openDetailsDialog, setOpenDetailDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  const handlefetchOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId));
  };

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailDialog(true);
    }
  }, [orderDetails]);

  console.log('orderDetails ', orderDetails);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className=" sr-onl">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((item) => (
                  <TableRow key={item?._id}>
                    <TableCell>{item?._id}</TableCell>
                    <TableCell className="font-semibold">
                      {item?.orderDate.split('T')[0]}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`capitalize font-semibold text-md  cursor-pointer ${
                          item?.orderStatus === 'pending'
                            ? 'bg-red-500 hover:bg-red-600 '
                            : item?.orderStatus === 'confirmed'
                            ? 'bg-green-500 hover:bg-green-600'
                            : ''
                        }`}
                      >
                        {item?.orderStatus}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-lg font-semibold">
                      &#8377; {item?.totalAmount}
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={()=>{
                          setOpenDetailDialog(false);
                          dispatch(resetOrderDetails())
                        }}
                      >
                        <Button
                          onClick={() => handlefetchOrderDetails(item._id)}
                          className="bg-teal-500 hover:bg-teal-600 h-8 transition-all ease-in-out duration-500 "
                        >
                          Details
                        </Button>
                        <ShoppingOrderDetails orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Orders;
