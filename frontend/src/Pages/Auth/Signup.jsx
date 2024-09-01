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

  const submitHandler = async (event) => {
    event.preventDefault();
    // Add form submission logic here, e.g., API call or validation
    console.log('Form submitted:', formData);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
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
        onSubmit={submitHandler}
      />
    </div>
  );
};

export default Signup;
