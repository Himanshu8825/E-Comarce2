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
import { useState } from 'react';

const Orders = () => {
  const [openDetailsDialog, setOpenDetailDialog] = useState(false);

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
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>2022-01-01</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>&#8377; 100.00</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpenDetailDialog}
                >
                  <Button
                    onClick={() => setOpenDetailDialog(true)}
                    className="bg-teal-500 hover:bg-teal-600 h-8 transition-all ease-in-out duration-500 "
                  >
                    Details
                  </Button>
                  <ShoppingOrderDetails />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Orders;
