import { useState, useEffect } from "react";
import axios from "axios";

const useEntityPublisher = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [assocdtlData, setAssocdtlData] = useState([]);

  useEffect(() => {
    // Fetch notification and assocdtl data from your API
    axios
      .get("http://localhost:5000/Notifications/read")
      .then((response) => setNotificationData(response.data.data))
      .catch((error) =>
        console.error("Error fetching notification data:", error)
      );

    axios
      .get("http://localhost:5000/AssocDocDtl/read")
      .then((response) => setAssocdtlData(response.data.data))
      .catch((error) => console.error("Error fetching assocdtl data:", error));
  }, [notificationData, assocdtlData]);

  const processNotifications = () => {
    // Group notifications by EntityId
    // alert(JSON.stringify(notificationData))
    const groupedNotifications = groupByEntityId(notificationData);

    // Process each group
    Object.keys(groupedNotifications).forEach((EntityID) => {
      //alert(EntityID)
      const group = groupedNotifications[EntityID];

      // 1. Check if all notification.EntityStatus based on notification.EntityId wise is "Approved"
      const allApproved = group.every(
        (notification) => notification.EntityStatus === "Approved"
      );

      // 2. Check if any notification.EntityStatus based on notification.EntityId wise is "Rejected"
      const anyRejected = group.some(
        (notification) => notification.EntityStatus === "Rejected"
      );

      // 2. Check if any notification.EntityStatus based on notification.EntityId wise is "Pending"
      const anyPending = group.some(
        (notification) => notification.EntityStatus === "Pending"
      );

      // API call to update assocdtl.Ispublished based on the conditions
      if (allApproved) {
        updateAssocdtlIspublished(EntityID, "YES");
      } else if (anyRejected) {
        updateAssocdtlIspublished(EntityID, "NO");
      } else if (anyPending) {
        updateAssocdtlIspublished(EntityID, null); // Use null for undefined state
      }
    });
    alert("Published Sucessfully");
  };

  const groupByEntityId = (data) => {
    if (!Array.isArray(data)) {
      console.error("Invalid data format: Expected an array.");
      return {};
    }

    return data.reduce((acc, notification) => {
      const EntityID = notification.EntityID;
      if (!acc[EntityID]) {
        acc[EntityID] = [];
      }
      acc[EntityID].push(notification);
      return acc;
    }, {});
  };

  const updateAssocdtlIspublished = (EntityID, newValue) => {
    // API call to update assocdtl.Ispublished
    axios
      .put(`http://localhost:5000/AssocDocDtl/update/${EntityID}`, {
        IsPublished: newValue,
      })
      .then((response) => {
        // Update the state or perform any other necessary actions
        setAssocdtlData(response.data);
      })
      .catch((error) =>
        console.error(
          `Error updating assocdtl.Ispublished for EntityId ${EntityID}:`,
          error
        )
      );
  };

  // Return the processNotifications function
  return { processNotifications };
};

export default useEntityPublisher;
