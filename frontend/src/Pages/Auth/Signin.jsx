import Form from '@/components/common/Form';
import { useToast } from '@/components/ui/use-toast';
import { loginFormControls } from '@/config/Index';
import { signinUser } from '@/store/Slices/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();

  const loginHandler = async (event) => {
    event.preventDefault();

    dispatch(signinUser(formData)).then((data)=>{


      if(data?.payload?.success){
        toast({
          title: data?.payload?.message,
        });
        // navigate('/dashboard');
      }else{
        toast({
          title: data?.payload,
          variant: 'destructive',
        });

      }
    })


  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-4xl text-[#7D0DC3] font-bold tracking-tight text-foreground">
          Signin to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium text-primary hover:underline hover:text-blue-500 ml-2"
            to="/auth/signup"
          >
            Signup
          </Link>
        </p>
      </div>
      <Form
        formControls={loginFormControls}
        buttonText={'Signin'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={loginHandler}
      />
    </div>
  );
};

export default Signin;
