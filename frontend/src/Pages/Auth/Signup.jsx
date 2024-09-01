import Form from '@/components/common/Form';
import { registerFormControls } from '@/config/Index';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const signupHandler = async (event) => {
    event.preventDefault();

    console.log('Form submitted:', formData);
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
