import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  address: string;
  contactInfo: string;
  description: string;
};
type Restaurant = {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
  ownerId: string;
};

type AddRestaurantFormProps = {
  onSubmit: (data: Restaurant) => void;
};

const AddRestaurantForm: React.FC<AddRestaurantFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      let response;
      response = await axios.post(`/api/users/restaurants`, data);
      toast.success("Restaurant added successfully");
      onSubmit(response.data);
      reset();
    } catch (error: any) {
      console.error("Error adding restaurant:", error.message);
      toast.error("Failed to add restaurant");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-4">Add Restaurant</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="input-field"
            placeholder="Enter restaurant name"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">
              Restaurant Name is required
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            {...register("address", { required: true })}
            className="input-field"
            placeholder="Enter address"
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">Address is required</p>
          )}
        </div>
        <div>
          <label
            htmlFor="contactInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Information
          </label>
          <input
            type="text"
            id="contactInfo"
            {...register("contactInfo", { required: true })}
            className="input-field"
            placeholder="Enter contact information"
          />
          {errors.contactInfo && (
            <p className="text-sm text-red-500 mt-1">
              Contact Information is required
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="input-field"
            placeholder="Enter description"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">Description is required</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurantForm;
