import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export function AuthService (){
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
      const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  try{
  useEffect(() => {
      setLoading(true);
      refreshToken();
      getUsers();
      setLoading(false);
    }, []);
  }catch(error){
      //navigate('/')
  }
  const refreshToken = useCallback(async () => {
      try {
        const response = await axios.get('http://localhost:5000/token');
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      } catch (error) {
        if (error.response) {
          navigate('/');
        }
      }
    }, [navigate]);
  
    const axiosJWT = axios.create();
  
    axiosJWT.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
          try {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setExpire(decoded.exp);
          } catch (error) {
            navigate('/');
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
    const getUsers = useCallback(async () => {
      try {
        const response = await axiosJWT.get('http://localhost:5000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        // Handle error
      }
    }, [axiosJWT, token]);
  
   return loading;
}
