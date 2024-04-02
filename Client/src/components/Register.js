import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from './images/logoimage.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
});


const Register = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/users', values);
      setPopupOpen(true); // Show the popup on successful registration
      //navigate('/');
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        console.log("error")
      }
    }
  };
  const closePopup = () => {
    setPopupOpen(false); // Close the popup
    navigate('/'); // Navigate to the login page
  };
  return (
    <div className="login-container">
      <div className="left-side">
        <img src={LoginImage} alt="Background" className="background-image" />
      </div>
      <div className="right-side">
        <div className="login-form">
          <h2>Register</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              {/*<p className="">{msg}</p>*/}
              <div className="form-group">
                <label className="lab" htmlFor="name">Name:</label>
                <Field type="text" name="name" className="inputfeild" placeholder="Name" required />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label className="lab" htmlFor="email">E-Mail:</label>
                <Field type="email" name="email" className="inputfeild" placeholder="G-mail" required />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label className="lab" htmlFor="password">Password:</label>
                <Field type="password" name="password" className="inputfeild" placeholder="**********" required />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label className="lab" htmlFor="confPassword">confPassword</label>
                <Field type="password" name="confPassword" className="inputfeild" placeholder="********" required />
                <ErrorMessage name="confPassword" component="div" className="error-message" />
              </div>
              <button className="loginbutton" type="submit">
                Sign Up
              </button>
              <p className="my-3">Already Have an Account?</p>
              <Link to="/" className="btn btn-default border w-100 bg-success text-white text-decoration-none">
                Log In
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
      <Modal
        isOpen={isPopupOpen}
        onRequestClose={closePopup}
        contentLabel="Registration Success Popup">
          
        <h1 className='text-success'>Registration Successful</h1>
        <p>Your account has been successfully created!</p>
        <button className="mt-3 continuebtn" onClick={closePopup}>Continue</button>
        
      </Modal>
    </div>
  );
};

 
export default Register