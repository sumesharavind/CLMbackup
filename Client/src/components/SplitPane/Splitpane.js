import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Searchbox from "./Searchbox";
import Attribute from "./Attribute";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import axios from "axios";

const Splitpane = () => {
  const [showAttribute, setShowAttribute] = useState(false);
  const [attributeData, setAttributeData] = useState([]);
  const isAttrSearch = useRef([true]);
  const attributeDataRef = useRef([]);
  const searchBoxRef = useRef(null);

  const toggleAttribute = () => {
    setShowAttribute(true);
    try {
      // Check if searchBoxRef.current is defined
      if (searchBoxRef.current) {
        // Check if disableSearchBtn is a function
        if (typeof searchBoxRef.current.disableSearchBtn === "function") {
          // Call the function
          searchBoxRef.current.disableSearchBtn();
        } else {
          alert("disableSearchBtn is not a function");
        }
      } else {
        alert("searchBoxRef.current is undefined");
      }
    } catch (errors) {
      alert(errors);
    }
  };

  const hideAttribute = () => {
    isAttrSearch.current = false;
    setShowAttribute(false);
  };

  const [currentPath, setCurrentPath] = useState("Configure / Attribute");

  const onSearch = async (attributeCode) => {
    console.log("code", attributeCode);
    await axios
      .get(`http://localhost:5000/attribute/read/${attributeCode}`)
      .then((response) => {
        //setAttributeData(response.data[0]);   --- if use raw Query
        attributeDataRef.current = response.data;
        isAttrSearch.current = true;
      })
      .catch((error) => {
        console.error("Error retrieving items:", error);
      });
  };
  useEffect(() => {
    isAttrSearch.current = false;
    return () => {};
  }, []);
  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={12} md={12}>
            <Breadcrumb currentPath={currentPath} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="mt-lg-3">
          <Col lg={5} xs={12}>
            <Searchbox
              onNewAttribute={toggleAttribute}
              onHideAttribute={hideAttribute}
              onSearchAttribute={onSearch}
              ref={searchBoxRef}
            />
          </Col>
          <Col lg={7} xs={12}>
            {showAttribute && (
              <Attribute
                onHideAttribute={hideAttribute}
                attrData={attributeDataRef.current}
                isAttrSearch={isAttrSearch.current}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Splitpane;
