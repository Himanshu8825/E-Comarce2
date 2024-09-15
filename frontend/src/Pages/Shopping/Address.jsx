import Form from '@/components/common/Form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { addressFormControls } from '@/config/Index';
import { AddressCard } from '@/Index';
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from '@/store/Slices/Shopping/AddressSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: '',
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  const handleManageAddress = async (e) => {
    e.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: 'You can add max 3 addresses',
        variant: 'destructive',
      });
      return;
    }

    if (currentEditedId !== null) {
      dispatch(
        editAddress({
          userId: user?.id,
          addressId: currentEditedId, 
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setCurrentEditId(null);
          setFormData(initialAddressFormData);
          toast({
            title: data?.payload?.message,
          });
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setFormData(initialAddressFormData);
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
    }
  };

  const handleDeleteAddress = (getCurrentAddress) => {


    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
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

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  //   console.log('Address List', addressList);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((address) => (
              <AddressCard
                key={address._id}
                addressInfo={address}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
                // setFormData={setFormData}
              />
            ))
          : null}
      </div>

      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? 'Edit Address' : 'Add New Adsress'}
        </CardTitle>
      </CardHeader>
      <CardContent className=" space-y-4">
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleManageAddress}
          buttonText={
            currentEditedId !== null ? 'Update Address' : 'Add  Adsress'
          }
        />
      </CardContent>
    </Card>
  );
};

export default Address;
