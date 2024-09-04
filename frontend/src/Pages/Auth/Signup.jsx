import Form from '@/components/common/Form';
import { useToast } from '@/components/ui/use-toast';
import { registerFormControls } from '@/config/Index';
import { signupUser } from '@/store/Slices/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = async (event) => {
    event.preventDefault();

    dispatch(signupUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate('/auth/signin');
      } else {
        toast({
          title: data?.payload,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-4xl text-[#7D0DC3] font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2 bg-green">
          Already have an account?
          <Link
            className="font-medium text-primary hover:underline hover:text-blue-500 ml-2"
            to="/auth/signin"
          >
            Sign in
          </Link>
        </p>
      </div>
      <Form
        formControls={registerFormControls}
        buttonText={'Signup'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={signupHandler}
      />
    </div>
  );
};

export default Signup;
