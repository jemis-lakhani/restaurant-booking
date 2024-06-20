import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(1, 'Password must be at least 1 characters'),
  role: yup.string().oneOf(['user', 'restaurantOwner'], 'Invalid role').default('user'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
