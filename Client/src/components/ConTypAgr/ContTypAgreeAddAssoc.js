import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowUp,
  faCircleArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import AddAssocCSS from "./ConTypAgree.module.css";
import AddAssociationForm from "./AddAssociationForm";
import axios from "axios";

const ContTypAgreeAddAssoc = ({
  associatedDocuments,
  setAssociatedDocuments,
  onAssociationChange,
  
}) => {
  const [showAssociation, setShowAssociation] = useState(false);
  const [savedAssociations, setSavedAssociations] = useState([]);
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [contractTypes, setContractTypes] = useState([]);
  // onAssociationChange(savedAssociations);

  useEffect(() => {
    axios
      .get("http://localhost:5000/AssocDocDtl/read")
      .then((response) => {
        console.log("Contract Types retrieved successfully:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          const filteredContractTypes = response.data.data
            .filter(
              (contractType) =>
                contractType.IsPublished &&
                contractType.IsPublished.toLowerCase() === "yes"
            )
            .map((contractType) => contractType.ContractTypeName);

          console.log("Filtered Contract Types:", filteredContractTypes);
          setContractTypes(filteredContractTypes);
        } else {
          console.error("Invalid response format. Expected 'data' array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching Contract Types:", error);
      });
    setSavedAssociations(associatedDocuments);

  }, [associatedDocuments]);

  const initialFormData = {
    AssociationName: "",
    AssociatedContractType: "",
    // RelationType: "",
    AllowInheritance: "No",
    AllowMultipleInstance: "No",
    IsMandatory: "No",
    DefinedByRule: "No",
    AllowTwoWayLinkage: "No",
    AllowPeerCreationWizard: "No",
    UseCustomNomenclature: "No",
    InlineAssociation: "No",
    CopyAssociationDuringAmendment: "No",
  };

  const ContainerAddAssociation = () => {
    setSelectedAssociation(null);
    setShowAssociation(!showAssociation);
  };

  useEffect(() => {
    console.log(JSON.stringify(savedAssociations));
    onAssociationChange(savedAssociations);

   },[savedAssociations]);

  // const deleteAssociation = () => {
  //   if (selectedAssociation) {
  //     const updatedAssociations = savedAssociations.filter(
  //       (association) => association !== selectedAssociation
  //     );
  //     setSavedAssociations(updatedAssociations);
  //     setShowAssociation(false);
  //   }
  // };
  const deleteAssociation = () => {
    if (selectedAssociation) {
      // Filter out the selected association from savedAssociations
      const updatedAssociations = savedAssociations.filter(
        (association) => association !== selectedAssociation
      );

      // Filter out the selected association from associatedDocuments
      const updatedDocuments = associatedDocuments.filter(
        (association) => association !== selectedAssociation
      );

      // Set the updated associations and associatedDocuments states
      setSavedAssociations(updatedAssociations);
      setAssociatedDocuments(updatedDocuments);

      setShowAssociation(false);
    }
  };

  const saveAssociation = (formData) => {
    // Update the associated documents list when a new association is saved
    setAssociatedDocuments((prevDocuments) => [...prevDocuments, formData]);
    setShowAssociation(false);
  };

  const handleAssociationClick = (association) => {
    setSelectedAssociation(association);
    setShowAssociation(true);
  };

  return (
    <div>
      <Row>
        <Col lg={5}>
          <Row>
            <Col xs={6} lg={8}></Col>
            <Col xs={6} lg={4} className="">
              {/* <Button
                className="ms-4 mt-5 mb-3 d-flex d-flex justidy-content-center "
                onClick={ContainerAddAssociation}
              >
                Add Association
              </Button> */}
              <div onClick={ContainerAddAssociation}>
                <p
                  className={`ms-4 mt-5 mb-3 d-flex d-flex justify-content-center ${AddAssocCSS.Associationbtn}`}
                >
                  Add Association
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              {/* Associated Documents List */}
              <div className={AddAssocCSS.AssociationListBox}>
                <div>
                  <h4>Associated Documents</h4>
                  <ul>
                    {savedAssociations.map((association, index) => (
                      <li
                        key={index}
                        onClick={() => handleAssociationClick(association)}
                        className={AddAssocCSS.AssociationItem}
                      >
                        {association.AssociatedContractType}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Up and Down Icons */}
                <div className={AddAssocCSS.UpDownButtton}>
                  <FontAwesomeIcon
                    icon={faCircleArrowUp}
                    size="xl"
                    className={`mb-4 ${AddAssocCSS.upicon}`}
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowDown}
                    size="xl"
                    className={AddAssocCSS.downicon}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={7}>
          {showAssociation && (
            <AddAssociationForm
              formData={selectedAssociation || initialFormData}
              saveAssociation={saveAssociation}
              deleteAssociation={deleteAssociation}
              isEditMode={selectedAssociation !== null}
              contractTypes={contractTypes}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ContTypAgreeAddAssoc;
