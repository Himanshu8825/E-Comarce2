import { Button } from '@/components/ui/button';
import { CheckCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-300">
      <CheckCircleIcon className="w-20 h-20 text-green-600 mb-4" />
      <h1 className="text-4xl font-bold text-green-800">Payment Successful!</h1>
      <p className="text-lg text-green-700 mt-2">
        Thank you for your purchase. Your order has been confirmed.
      </p>
      <Button
        onClick={() => navigate('/shop/account')}
        variant="outline"
        className="mt-6 font-bold"
      >
        See Your Order
      </Button>
    </div>
  );
};

export default PaymentSuccess;
