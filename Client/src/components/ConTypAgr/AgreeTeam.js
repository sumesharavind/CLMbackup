import React, { useEffect, useState } from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import SavButton from "../SavicControls/SavButton";
import { MdDeleteForever } from "react-icons/md";
import AgreeDocCSS from "./ConTypAgree.module.css";
import axios from "axios";

const AgreeTeam = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const AttributeList = []; // changes by 26/10/2023
  // State to manage the form fields
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
  });

  // State to store team members
  const [teamMembers, setTeamMembers] = useState(
    // Retrieve team members from localStorage on component mount
    JSON.parse(localStorage.getItem("teamMembers")) || []
  );

  useEffect(() => {
    // Update localStorage whenever teamMembers change
    localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
    props.onChange("UserDtl", teamMembers);
  }, [teamMembers]);
  useEffect(() => {
    // changes by 26/10/2023
    axios
      .get("http://localhost:5000/teamuser")
      .then((response) => {
        console.log("Item retrived successfully:", response.data);
        response.data.map((x) => AttributeList.push(x.name));
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  });

  const handleSearch = (e) => {
    const term = e.target.value;
    if (term !== null && term.trim() !== "") {
      setSearchTerm(term);
      setFormData({
        ...formData,
        name: term,
      });
      const filteredResults = AttributeList.filter((AttrList) =>
        AttrList.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setSearchTerm([]);
      setResults([]);
    }
  };
  const handleSelect = (selectedAttribute) => {
    setSearchTerm(selectedAttribute);
    setFormData({
      ...formData,
      name: selectedAttribute, // Set the complete selected name
    });
    // Fetch the entire user list from the backend
    axios
      .get("http://localhost:5000/teamuser")
      .then((response) => {
        const users = response.data; // Assuming the API returns an array of users
        const selectedUser = users.find(
          (user) => user.name === selectedAttribute
        );

        if (selectedUser) {
          const selectedUserId = selectedUser.id; // Assuming 'id' field exists in user data
          console.log(
            "Id is :--------------------------------------- " + selectedUserId
          );
          // Find the user by ID from the already fetched user list
          const userData = users.find((user) => user.id === selectedUserId);

          if (userData) {
            // Extract email from userData (modify as per your backend response structure)
            const userEmail = userData.email;

            setFormData((prevFormData) => ({
              ...prevFormData,
              email: userEmail,
            }));
          } else {
            console.error("Selected user not found in user data");
            // Handle case where the selected user ID isn't found in the user list
          }
        } else {
          console.error("Selected user not found in team user list");
          // Handle case where the selected user isn't found in the team user list
        }
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
        // Handle error fetching user list here
      });

    setResults([]); // Clear the search results
  };

  // Function to handle form submission
  const handleSubmitTeam = (e) => {
    e.preventDefault();

    // Perform actions with the form data (e.g., send it to a server)
    console.log("Form submitted:", formData);
    // Clear the form fields
    if (formData.name && formData.role && formData.email) {
      setTeamMembers([...teamMembers, formData]);
      props.onChange("UserDtl", teamMembers);
      setFormData({
        name: "",
        role: "",
        email: "",
      });
      setSearchTerm(""); // Reset search term
    }
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedTeamMembers = [...teamMembers];
      updatedTeamMembers.splice(deleteIndex, 1);
      setTeamMembers(updatedTeamMembers);
      setShowConfirmation(false);
      setDeleteIndex(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setDeleteIndex(null);
  };
  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding form field in the state
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={`w3-animate-zoom  ${AgreeDocCSS.padFormTable}`}>
      <Row className={AgreeDocCSS.padInsideAdjustement}>
        <Col md={5}>
          <Form
            onSubmit={handleSubmitTeam}
            className={`justify-content-md-center ${AgreeDocCSS.listsearchParent}`}
          >
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="search"
                placeholder="Enter name"
                name="name"
                //value={formData.name}
                //onChange={handleInputChange}
                value={searchTerm}
                onChange={handleSearch}
                autoComplete="off"
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                placeholder="Enter role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="option">Option</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Approver">Approver</option>
                <option value="Contributor"> Contributor</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled
              />
            </Form.Group>

            <SavButton variant="primary" text="ADD" type="submit" />
            <div className={AgreeDocCSS.listsearchchild}>
              {results // to remove duplicates strings
                .filter((val, id, array) => {
                  return array.indexOf(val) === id;
                })
                .map((data, index) => (
                  <li
                    className={` ${AgreeDocCSS.searchValues}`}
                    key={index}
                    onClick={() => handleSelect(data)}
                  >
                    {data}
                  </li>
                ))}
            </div>
          </Form>
        </Col>
        <Col md={7}>
          <table className="table table-bordered justify-content-md-center mt-4">
            <thead>
              <tr className={AgreeDocCSS.TableHeading}>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col" className={AgreeDocCSS.DeleteColumnAlign}>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Render table rows dynamically */}
              {teamMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.name}</td>
                  <td>{member.role}</td>
                  <td>{member.email}</td>
                  <td className={AgreeDocCSS.DeleteIconPlaced}>
                    <MdDeleteForever
                      className={AgreeDocCSS.DeleteIcon}
                      onClick={() => handleDelete(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Confirmation Modal */}
          <Modal show={showConfirmation} onHide={cancelDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete?</Modal.Body>
            <Modal.Footer>
              <SavButton text="No" variant="secondary" onClick={cancelDelete} />

              <SavButton text="yes" variant="primary" onClick={confirmDelete} />
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default AgreeTeam;
