import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DualCSS from "./Dual.module.css";
import axios from "axios";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
const DualList = (props) => {
  const [availableOptions, setAvailableOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const avaiAttrRef = useRef(null);
  const selAttrRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase().trim());
    console.log(e);
  };

  useEffect(() => {
    setAvailableOptions(props.data.AvailAttr);
    setSelectedOptions(props.data.SelAttr);

    if (
      (props.data.AvailAttr === null || props.data.AvailAttr.length === 0) &&
      (props.data.SelAttr === null || props.data.SelAttr.length === 0)
    ) {
      // changes by 26/10/2023
      axios
        .get("http://localhost:5000/attribute/read")
        .then((response) => {
          console.log("Item retrived successfully:", response.data);
          const display = response.data.map((x) => x.DisplayName);
          setAvailableOptions(display);
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    }
  }, []);

  useEffect(() => {
    props.onChange("AvailAttr", availableOptions);
    props.onChange("SelAttr", selectedOptions);
  }, [selectedOptions, availableOptions]);

  const handleSelect = (e) => {
    const { value } = e.target;

    if (e.target.checked) {
      setAvailableOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
      setSelectedOptions((prevOptions) => [...prevOptions, value]);
    } else {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
      setAvailableOptions((prevOptions) => [...prevOptions, value]);
    }
  };

  const handleSelect1 = (e) => {
    const { value } = e.target;

    if (e.target.checked) {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
      setAvailableOptions((prevOptions) => [...prevOptions, value]);
    } else {
      setAvailableOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
      setSelectedOptions((prevOptions) => [...prevOptions, value]);
    }
  };

  const moveToLeft = () => {
    if (selAttrRef.current) {
      // Get the selected items
      const checkedOptions = Array.from(
        selAttrRef.current.querySelectorAll("li")
      )
        .filter((li) => li.querySelector('input[type="checkbox"]').checked)
        .map((checkedOption) => checkedOption.innerText);

      // Remove selected items from selectedItems
      const updatedSelectedOptions = selectedOptions.filter(
        (option) => !checkedOptions.includes(option)
      );

      // Add selected items to availableItems
      setAvailableOptions([...availableOptions, ...checkedOptions]);

      // Update selectedItemsnp
      setSelectedOptions(updatedSelectedOptions);
    }
  };

  const moveToRight = () => {
    if (avaiAttrRef.current) {
      // Get the selected items
      const checkedOptions = Array.from(
        avaiAttrRef.current.querySelectorAll("li")
      )
        .filter((li) => li.querySelector('input[type="checkbox"]').checked)
        .map((checkedOption) => checkedOption.innerText);

      // Remove selected items from availableItems
      const updatedAvailableOptions = availableOptions.filter(
        (option) => !checkedOptions.includes(option)
      );

      // Add selected items to selectedItems
      setSelectedOptions([...selectedOptions, ...checkedOptions]);

      // Update availableItems
      setAvailableOptions(updatedAvailableOptions);
    }
  };

  const moveToLeftAll = () => {
    if (selectedOptions.length > 0) {
      setAvailableOptions((prevOptions) => [
        ...prevOptions,
        ...selectedOptions,
      ]);
      setSelectedOptions([]);
    }
  };

  const moveToRightAll = () => {
    if (availableOptions.length > 0) {
      setSelectedOptions((prevOptions) => [
        ...prevOptions,
        ...availableOptions,
      ]);
      setAvailableOptions([]);
    }
  };

  const isOptionChecked = (option) => selectedOptions.includes(option);

  const moveCheckedToTop = () => {
    // Get the selected items

    const checkedOptions = Array.from(selAttrRef.current.querySelectorAll("li"))
      .filter((li) => li.querySelector('input[type="checkbox"]').checked)
      .map((checkedOption) => checkedOption.innerText);

    const uncheckedOptions = Array.from(
      selAttrRef.current.querySelectorAll("li")
    )
      .filter((li) => !li.querySelector('input[type="checkbox"]').checked)
      .map((checkedOption) => checkedOption.innerText);

    setSelectedOptions([...checkedOptions, ...uncheckedOptions]);

    // Set the checked property of each option to false
    selectedOptions.forEach((option) => {
      const checkbox = selAttrRef.current.querySelector(
        `input[type="checkbox"][id="${option}"]`
      );
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  };

  const moveCheckedToBottom = () => {
    // Get the selected items
    const checkedOptions = Array.from(selAttrRef.current.querySelectorAll("li"))
      .filter((li) => li.querySelector('input[type="checkbox"]').checked)
      .map((checkedOption) => checkedOption.innerText);

    const uncheckedOptions = Array.from(
      selAttrRef.current.querySelectorAll("li")
    )
      .filter((li) => !li.querySelector('input[type="checkbox"]').checked)
      .map((checkedOption) => checkedOption.innerText);

    setSelectedOptions([...uncheckedOptions, ...checkedOptions]);

    // Set the checked property of each option to false
    selectedOptions.forEach((option) => {
      const checkbox = selAttrRef.current.querySelector(
        `input[type="checkbox"][id="${option}"]`
      );
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  };

  const moveCheckedToUp = () => {
    const selectedIndexes = [];

    // Get the selected items indexes

    selectedOptions.filter((option, index) => {
      if (
        selAttrRef.current.querySelector(
          `input[type="checkbox"][id="${option}"]`
        )?.checked
      ) {
        selectedIndexes.push(index);
      }
    });

    const newOptionist = [...selectedOptions];

    for (let i = 0; i < selectedIndexes.length; i++) {
      if (selectedIndexes[i] > 0) {
        const selectedOption = newOptionist.splice(selectedIndexes[i], 1)[0];

        newOptionist.splice(selectedIndexes[i] - 1, 0, selectedOption);

        setSelectedOptions(newOptionist);
      }
    }

    /* // Set the checked property of each option to false
    selectedOptions.forEach((option) => {
      const checkbox = selAttrRef.current.querySelector(
        `input[type="checkbox"][id="${option}"]`
      );
      if (checkbox) {
        checkbox.checked = false;
      }
    }); */
  };
  const moveCheckedToDown = () => {
    const selectedIndexes = [];

    // Get the selected items indexes

    selectedOptions.filter((option, index) => {
      if (
        selAttrRef.current.querySelector(
          `input[type="checkbox"][id="${option}"]`
        )?.checked
      ) {
        selectedIndexes.push(index);
      }
    });

    const newOptionList = [...selectedOptions];
    let lastMovedItemId = null;

    for (let i = selectedIndexes.length - 1; i >= 0; i--) {
      if (
        selectedIndexes[i] <= newOptionList.length - 1 &&
        selectedIndexes[i] !== -1
      ) {
        const selectedOption = newOptionList.splice(selectedIndexes[i], 1)[0];

        newOptionList.splice(selectedIndexes[i] + 1, 0, selectedOption);

        lastMovedItemId = selectedOption;

        // setSelectedOptions(newOptionList);
      }
    }

    setSelectedOptions(newOptionList);

    // Scroll the last moved item into view
    if (lastMovedItemId !== null && selAttrRef.current) {
      const itemElement = selAttrRef.current.querySelector(
        `input[type="checkbox"][id="${lastMovedItemId}"]`
      );
      if (itemElement) {
        itemElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    // Set the checked property of each option to false
    /*  selectedOptions.forEach((option) => {
      const checkbox = selAttrRef.current.querySelector(
        `input[type="checkbox"][id="${option}"]`
      );
      if (checkbox) {
        checkbox.checked = false;
      }
    }); */
  };

  return (
    <div>
      <Row className="mt-lg-5 mt-3">
        <Col lg={1}></Col>
        <Col lg={5} xs={12} md={5}>
          <div className={DualCSS.dualListBox}>
            <div className={`pt-3 ps-4 pb-2 ${DualCSS.dualHead}`}>
              <h4 className={DualCSS.dualHeadFont}>Available Attributes</h4>
              <form>
                <input
                  className={DualCSS.attSearch}
                  type="text"
                  name="search"
                  placeholder="Search.."
                  onChange={handleSearchChange}
                  autoComplete="off"
                />
              </form>
            </div>
            <div className={DualCSS.leftList}>
              <ul ref={avaiAttrRef}>
                {availableOptions
                  .filter((option) =>
                    option.toLowerCase().includes(searchQuery)
                  )
                  .map((option) => (
                    <li key={option}>
                      <label className={DualCSS.LabelAdjustment}>
                        <input
                          type="checkbox"
                          id={option}
                          value={option}
                          className={DualCSS.checkStyle}
                        />
                        <span className="ms-3">{option}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
            <div className={DualCSS.buttonContainer}>
              <button className={DualCSS.DualArrowBtn} onClick={moveToLeftAll}>
                <MdOutlineKeyboardDoubleArrowLeft />
              </button>
              <button className={DualCSS.DualArrowBtn} onClick={moveToLeft}>
                <MdOutlineKeyboardArrowLeft />
              </button>
              <button className={DualCSS.DualArrowBtn} onClick={moveToRight}>
                <MdOutlineKeyboardArrowRight />
              </button>
              <button className={DualCSS.DualArrowBtn} onClick={moveToRightAll}>
                <MdOutlineKeyboardDoubleArrowRight />
              </button>
            </div>
          </div>
        </Col>

        <Col lg={5} xs={12} md={5}>
          <div className={DualCSS.dualListBox}>
            <div className={`pt-3 ps-4 pb-2 ${DualCSS.dualHead}`}>
              <h4 className={DualCSS.dualHeadFont}>Selected Attributes</h4>
              <form>
                <input
                  className={DualCSS.attSearch}
                  type="text"
                  name="search"
                  placeholder="Search.."
                  onChange={handleSearchChange}
                  autoComplete="off"
                />
              </form>
            </div>
            <div className={` mt-3 mt-lg-0 ${DualCSS.rightList}`}>
              <ul ref={selAttrRef}>
                {selectedOptions
                  .filter((option) =>
                    option.toLowerCase().includes(searchQuery)
                  )
                  .map((option) => (
                    <li key={option}>
                      <label className={DualCSS.LabelAdjustment}>
                        <input
                          type="checkbox"
                          id={option}
                          value={option}
                          className={DualCSS.checkStyle}
                        />
                        <span className="ms-3">{option}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
            <div className={DualCSS.buttonContainer}>
              <button
                className={DualCSS.DualArrowBtn}
                onClick={moveCheckedToTop}
              >
                <MdOutlineKeyboardDoubleArrowUp />
              </button>
              <button
                className={DualCSS.DualArrowBtn}
                onClick={moveCheckedToUp}
              >
                <MdOutlineKeyboardArrowUp />
              </button>
              <button
                className={DualCSS.DualArrowBtn}
                onClick={moveCheckedToDown}
              >
                <MdOutlineKeyboardArrowDown />
              </button>
              <button
                className={DualCSS.DualArrowBtn}
                onClick={moveCheckedToBottom}
              >
                <MdOutlineKeyboardDoubleArrowDown />
              </button>
            </div>
          </div>
        </Col>

        <Col lg={1}></Col>
      </Row>
    </div>
  );
};

export default DualList;
