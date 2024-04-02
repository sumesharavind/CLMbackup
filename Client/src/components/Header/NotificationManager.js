// NotificationManager.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationList from "./NotificationList.js";
import { useGlobalContext } from "../GlobalContext.js";

const NotificationManager = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const { state } = useGlobalContext();
  const fetchNotifications = async () => {
    try {
      // alert(userId);
      const response = await axios.get(
        `http://localhost:5000/Notifications/read/${userId}/Pending`
      ); //
      const resJSON = response.data.data;
      const data = resJSON;
      // Get the number of records in resJSON data
      const numberOfRecords = resJSON.length;
      state.nCount = numberOfRecords;
      console.log("Number of records:", numberOfRecords);
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // Set up interval to fetch notifications every 1 minute (60,000 milliseconds)
    const intervalId = setInterval(fetchNotifications, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId]);

  return (
    <div>
      <NotificationList notifications={notifications} />
    </div>
  );
};

export default NotificationManager;
