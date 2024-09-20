import AdminOrderDetails from '@/components/Admin/AdminOrderDetails';
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
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from '@/store/Slices/Admin/AdminOrderSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AdminOrder = () => {
  const [openDetailsDialog, setOpenDetailDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  const handlefetchOrderDetails = (getId) => {
    dispatch(getOrderDetailsForAdmin(getId));
  };

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log('orderDetails: ', orderDetails);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailDialog(true);
    }
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle> All Order</CardTitle>
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
                        onOpenChange={() => {
                          setOpenDetailDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handlefetchOrderDetails(item._id)}
                          className="bg-[#7D0DC3] hover:bg-[#5a058e] h-8 transition-all ease-in-out duration-500 "
                        >
                          Details
                        </Button>
                        <AdminOrderDetails orderDetails={orderDetails} />
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

export default AdminOrder;
