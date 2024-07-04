import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import InputField from "./InputField";

type FormValues = {
  name: string;
  address: string;
  contactInfo: string;
  description: string;
  openTime: string;
  closeTime: string;
};

type Restaurant = {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
  ownerId: string;
  openTime: string;
  closeTime: string;
};

type AddRestaurantFormProps = {
  restaurant?: Restaurant;
  onSubmit: (data: Restaurant) => void;
};

const AddRestaurantForm: React.FC<AddRestaurantFormProps> = ({
  restaurant,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (restaurant) {
      setValue("name", restaurant.name);
      setValue("address", restaurant.address);
      setValue("contactInfo", restaurant.contactInfo);
      setValue("description", restaurant.description);
      setValue("openTime", restaurant.openTime);
      setValue("closeTime", restaurant.closeTime);
    }
  }, [restaurant, setValue]);

  const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      let response;
      if (restaurant) {
        response = await axios.put(`/api/users/restaurants`, {
          ...data,
          _id: restaurant._id,
        });
        toast.success("Restaurant updated successfully");
      } else {
        response = await axios.post(`/api/users/restaurants`, data);
        toast.success("Restaurant added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      onSubmit(response.data);
      reset();
    } catch (error: any) {
      console.error("Error saving restaurant:", error.message);
      toast.error(`Failed to ${restaurant ? "update" : "add"} restaurant`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pb-1">
      <h2 className="text-xl font-semibold mb-4">
        {restaurant ? "Update Restaurant" : "Add Restaurant"}
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <InputField
          id="name"
          label="Restaurant Name"
          placeholder="Enter restaurant name"
          error={errors.name?.message}
          register={register("name", {
            required: "Restaurant Name is required",
          })}
        />
        <InputField
          id="address"
          label="Address"
          placeholder="Enter address"
          error={errors.address?.message}
          register={register("address", { required: "Address is required" })}
        />
        <InputField
          id="contactInfo"
          label="Contact Information"
          placeholder="Enter contact information"
          error={errors.contactInfo?.message}
          register={register("contactInfo", {
            required: "Contact Information is required",
          })}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="openTime"
              className="block text-sm font-medium text-gray-700"
            >
              Opening Time
            </label>
            <input
              type="time"
              id="openTime"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("openTime", {
                required: "Opening Time is required",
              })}
            />
            {errors.openTime && (
              <p className="text-sm text-red-500 mt-1">
                {errors.openTime.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="closeTime"
              className="block text-sm font-medium text-gray-700"
            >
              Closing Time
            </label>
            <input
              type="time"
              id="closeTime"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("closeTime", {
                required: "Closing Time is required",
              })}
            />
            {errors.closeTime && (
              <p className="text-sm text-red-500 mt-1">
                {errors.closeTime.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          {restaurant ? "Update Restaurant" : "Add Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default AddRestaurantForm;
