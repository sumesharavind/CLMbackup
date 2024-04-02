import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Container, Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap or any other UI library you prefer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
//import data from './data/Notification.json';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

/////////////// popup//////////////////////////////
const ViewDetailsModal = ({ data, onClose }) => {
  const { Data } = data;
  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  ////// popup//////

  const handleStatusUpdate = async (
    fdata,
    newStatus,
    successMessage,
    onClose
  ) => {
    try {
      const confirmation = window.confirm(
        `Are you sure you want to ${newStatus} the status?`
      );
      if (confirmation) {
        fdata.EntityStatus = newStatus;
        const response = await axios.put(
          `http://localhost:5000/Notifications/update/${fdata.UserId}/${fdata.NotificationId}`,
          fdata
        );
        console.log(response.data);
        window.alert(successMessage);
        onClose();
        // Additional logic for status update goes here
      }
    } catch (error) {
      console.error("Error updating EntityStatus:", error.message);
    }
  };
  const handleApprove = async (fdata) => {
    await handleStatusUpdate(fdata, "Approved", "Approved!", onClose);
  };

  const handleReject = async (fdata) => {
    await handleStatusUpdate(fdata, "Rejected", "Rejected!", onClose);
  };

  ///////form/////
  let formData = {};
  if (isJsonString(Data)) {
    formData = JSON.parse(Data);
  }

  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Data Details Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {Object.keys(formData).map((key, index) => {
            return (
              <div key={index} className="mb-3 row align-items-center">
                <label
                  htmlFor={key}
                  className="col-sm-3 col-md-6 col-lg-4 col-form-label text-sm-start mb-2 mb-sm-0"
                  style={{ paddingRight: "15px", minWidth: "100px" }}
                >
                  {key}
                </label>
                <div className="col-sm-9 col-md-6 col-lg-8">
                  {key !== "TeamMembers" ? (
                    <input
                      type="text"
                      className="form-control"
                      id={key}
                      name={key}
                      value={
                        typeof formData[key] === "object"
                          ? JSON.stringify(formData[key])
                          : formData[key]
                      }
                      readOnly
                    />
                  ) : (
                    <textarea
                      rows={4}
                      className="form-control"
                      id={key}
                      name={key}
                      value={
                        formData.TeamMembers
                          ? Array.isArray(formData.TeamMembers)
                            ? formData.TeamMembers.map(
                                (member) =>
                                  `Name:${member.name}, Role:${member.role}, Email:${member.email}`
                              ).join("\n")
                            : formData.TeamMembers
                          : ""
                      }
                      readOnly
                    />
                  )}
                </div>
              </div>
            );
          })}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => handleApprove(data)}>
          <FontAwesomeIcon icon={faCheck} className="mr-1" /> Approve
        </Button>
        <Button variant="danger" onClick={() => handleReject(data)}>
          <FontAwesomeIcon icon={faTimes} className="mr-1" /> Reject
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
///////form///////

///table/////////
const NotificationList = ({ notifications }) => {
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    console.log(JSON.stringify(notifications));
    if (notifications) {
      setFilteredDetails(notifications);
      setDetails(notifications);
    }
  }, [notifications]);

  const handleFilter = (text) => {
    const filteredData = details.filter((row) =>
      Object.values(row).some(
        (value) =>
          value && value.toString().toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredDetails(filteredData.length > 0 ? filteredData : details);
  };

  const paraStyle = {
    fontSize: "25px",
  };
  const columns =
    details.length > 0
      ? Object.keys(details[0])
          .filter((key) => key !== "Data") // Exclude 'Data' column
          .map((key) => {
            return {
              name: key.charAt(0).toUpperCase() + key.slice(1),
              selector: (row) => {
                if (key.includes(".")) {
                  const nestedKeys = key.split(".");
                  let nestedValue = row;
                  nestedKeys.forEach((nestedKey) => {
                    nestedValue = nestedValue[nestedKey];
                  });
                  return nestedValue;
                } else if (typeof row[key] === "object") {
                  return JSON.stringify(row[key]);
                }
                return row[key];
              },
              sortable: true,
              width: "160px",
            };
          })
      : [];

  const viewColumn = {
    name: "View",
    cell: (row) => (
      <FontAwesomeIcon
        icon={faEye}
        onClick={() => setSelectedRow(row)}
        style={{ cursor: "pointer" }}
      />
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "60px",
  };

  columns.push(viewColumn);

  return (
    <Container
      className="mt-4"
      style={{
        border: "3px solid #ccc",
        borderRadius: "5px",
        paddingTop: "20px",
      }}
    >
      {filteredDetails && filteredDetails.length > 0 ? (
        <>
          <DataTable
            columns={columns}
            data={filteredDetails}
            pagination
            selectableRows
            fixedHeader
            subHeader
            subHeaderComponent={
              <input
                type="text"
                className="form-control w-25"
                placeholder="Enter Text"
                onChange={(e) => handleFilter(e.target.value)}
              />
            }
          />
          {selectedRow && (
            <ViewDetailsModal
              data={selectedRow}
              onClose={() => setSelectedRow(null)}
            />
          )}
        </>
      ) : (
        <p style={paraStyle} className="text-center">
          No Pending Notifications Found !!
        </p>
      )}
    </Container>
  );
};

export default NotificationList;
