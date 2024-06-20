    import React from 'react';
    import { useForm, SubmitHandler } from 'react-hook-form';
    import axios from 'axios';
    import toast from 'react-hot-toast';

    type FormValues = {
    name: string;
    address: string;
    contactInfo: string;
    description: string;  
    };

    const AddRestaurantForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
        const response = await axios.post('/api/users/restaurants', data);
        console.log('Restaurant added successfully:', response.data);
        toast.success('Restaurant added successfully');
        } catch (error: any) {
        console.error('Error adding restaurant:', error.message);
        toast.error('Failed to add restaurant');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Add Restaurant</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: true })}
                className="input-field"
                placeholder="Enter restaurant name"
              />
              {errors.name && <p className="text-red-500">Restaurant Name is required</p>}
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                {...register('address', { required: true })}
                className="input-field"
                placeholder="Enter address"
              />
              {errors.address && <p className="text-red-500">Address is required</p>}
            </div>
            <div>
              <label htmlFor="contactInfo" className="block text-gray-700 mb-1">
                Contact Information
              </label>
              <input
                type="text"
                id="contactInfo"
                {...register('contactInfo', { required: true })}
                className="input-field"
                placeholder="Enter contact information"
              />
              {errors.contactInfo && <p className="text-red-500">Contact Information is required</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                {...register('description', { required: true })}
                className="input-field"
                placeholder="Enter description"
              />
              {errors.description && <p className="text-red-500">Description is required</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
            >
              Add Restaurant
            </button>
          </form>
        </div>
      );
    };

    export default AddRestaurantForm;
