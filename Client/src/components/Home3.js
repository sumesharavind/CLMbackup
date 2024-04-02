import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import {AuthService} from './AuthService'
//const [loading, setLoading] = useState(true);

const Home3 = () => {

  const Loading = AuthService()

  const navigate = useNavigate();
  
  const Logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (Loading) {
    return null;
  }
  else{
  return (
    <div>
      <Header />
      <button onClick={Logout} className="mt-5">
        Log Out
      </button>
    </div>
  );
  }
};

export default Home3;
