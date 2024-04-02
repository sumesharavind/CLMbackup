import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import { PuffLoader } from "react-spinners";
import Contracttype from "./Configure/Contracttype";
import Splitpane from "./SplitPane/Splitpane";
import Multistep from "./ContAgreeMultipleform/ContAgreeMultistep.js";
import AssocDocuMultiform from "./AssoDocMultiform/AssocDocuMultiform";
//import DynamicJSONCreation from "./ConTypAssocDoc/DynamicJSONCreation";

import { useGlobalContext } from "./GlobalContext.js"; //--------------------------------
import NotificationManager from "./Header/NotificationManager.js";
import HeaderContent from "./HeaderContent/HeaderContent.js";
import TemplateJson from "./Template/TemplateJson.js";

const Home = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const { state } = useGlobalContext();
  const [componentToDisplay, setComponentToDisplay] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  }, [navigate]);

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        try {
          const response = await axios.get("http://localhost:5000/token");
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setExpire(decoded.exp);
        } catch (error) {
          navigate("/");
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
      const response = await axiosJWT.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      // Handle error
    }
  }, [axiosJWT, token]);

  useEffect(() => {
    refreshToken();
    getUsers();
  }, [refreshToken, getUsers]);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await axios.get(`
http://localhost:5000/Notifications/read/${state.userID}/Pending`); //${state.userId}

        //
        const resJSON = response.data.data;
        state.nCount = resJSON.length;
        //alert(state.nCount);
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };
    fetchNotificationCount();
  }, [state.userId]);

  const handleComponentChange = (componentName) => {
    // Handle the component change based on the clicked link
    switch (componentName) {
      case "Contracttype":
        setComponentToDisplay(
          <Contracttype onComponentChange={handleComponentChange} />
        );
        break;
      case "Splitpane":
        setComponentToDisplay(<Splitpane />);
        break;
      case "HeaderContent":
        setComponentToDisplay(<HeaderContent />);
        break;
      case "Multistep":
        setComponentToDisplay(<Multistep />);
        break;
      case "AssocDocuMultiform":
        setComponentToDisplay(<AssocDocuMultiform />);
        break;
      case "Notifications":
        setComponentToDisplay(<NotificationManager userId={state.userID} />);
        break;
      case "TemplateJson":
        setComponentToDisplay(<TemplateJson />);
        break;
      default:
        setComponentToDisplay(null); // Clear the displayed component
        break;
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Render loading spinner if loading is true
  if (loading) {
    return (
      <div className="sweet-loading">
        <PuffLoader
          className="perloaderCSS"
          size={120}
          color={"#6431a7"}
          loading={loading}
        />
      </div>
    );
  }
  return (
    <>
      <div>
        <Header onComponentChange={handleComponentChange} />

        <div id="componetsDisplay">{componentToDisplay}</div>

        {/*  {state.userID}
        <br></br>
        {state.userName}
        <br></br>
        {state.userEmail} */}
        {/*<DynamicJSONCreation />*/}

        {/*<MyForm2></MyForm2>*/}
      </div>
    </>
  );
};

export default Home;
