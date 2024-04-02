import React, { useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SearchCSS from "./Search.module.css";
import axios from "axios";

const Searchbox = React.forwardRef((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const btnSearchRef = useRef(null);

  const AttributeList = []; // changes by 26/10/2023
  useEffect(() => {
    // changes by 26/10/2023
    axios
      .get("https://savictek.azurewebsites.net/attribute/read")
      .then((response) => {
        console.log("Item retrived successfully:", response.data);
        response.data.map((x) => AttributeList.push(x.DisplayName));
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  });

  useEffect(() => {
    btnSearchRef.current.disabled = true;
  }, []);

  const handleSearch = (e) => {
    props.onHideAttribute();
    const term = e.target.value;
    if (term !== null && term.trim() !== "") {
      setSearchTerm(term);

      const filteredResults = AttributeList.filter((AttrList) =>
        AttrList.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setSearchTerm([]);
      setResults([]);
    }
    btnSearchRef.current.disabled = true;
  };
  const handleSelect = (selectedAttribute) => {
    setSearchTerm(selectedAttribute);
    setResults([]);
    props.onSearchAttribute(selectedAttribute);
    props.onHideAttribute();
    btnSearchRef.current.disabled = false;
  };

  const disableSearchBtn = () => {
    btnSearchRef.current.disabled = true;
    setSearchTerm([]);
    setResults([]);
  };

  React.useImperativeHandle(ref, () => ({
    disableSearchBtn,
  }));

  return (
    <>
      <div className={SearchCSS.SlipaneBg}>
        <Row>
          <Col lg={7} xs={6} md={8} className="mt-3">
            <h4 className={` fw-semibold ${SearchCSS.Attribute}`}>
              {" "}
              Available Attributes
            </h4>
          </Col>
          <Col lg={5} xs={6} md={4} className="mt-3">
            <Button
              className={`${SearchCSS.NewAttributeButton}`}
              onClick={props.onNewAttribute}
            >
              New Attribute
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Form className={SearchCSS.Search}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button
                ref={btnSearchRef}
                variant="outline-success"
                onClick={props.onNewAttribute}
              >
                Search
              </Button>
            </Form>

            {results.length > 0 && (
              <ul className={`mt-3 ${SearchCSS.searchList}`}>
                {results // to remove duplicates strings
                  .filter((val, id, array) => {
                    return array.indexOf(val) === id;
                  })
                  .map((data, index) => (
                    <li
                      className={` ${SearchCSS.searchValues}`}
                      key={index}
                      onClick={() => handleSelect(data)}
                    >
                      {data}
                    </li>
                  ))}
              </ul>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
});

export default Searchbox;
