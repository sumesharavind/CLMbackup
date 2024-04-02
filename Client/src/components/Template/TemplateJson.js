import DataTable from "react-data-table-component";
import { Container, Row, Button } from "react-bootstrap";
import { MdVisibility } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Stack from "react-bootstrap/Stack";
import TemplateCSS from "./Template.module.css";
import { FaAngleDown } from "react-icons/fa";
import TemplateMultiform from "./TempCreateMultiform.js";
import React, { useState } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TiSpannerOutline } from "react-icons/ti";

const columns = [
  {
    name: "Entity Name",
    selector: (row) => row.EntityName,
  },
  {
    name: "Name",
    selector: (row) => row.Name,
  },
  {
    name: "Created By",
    selector: (row) => row.CreatedBy,
  },
  {
    name: "Created On",
    selector: (row) => row.CreatedOn,
  },
  {
    name: "Status",
    selector: (row) => row.Status,
  },
  {
    name: "Visible",
    selector: (row) => row.Visible,
  },
];

const data = [
  {
    id: 1,
    EntityName: "Beetlejuice",
    Name: "1988",
    CreatedBy: "sam",
    CreatedOn: "02/12/2023",
    Status: "Approved",
    Visible: (
      <span>
        {" "}
        <MdVisibility /> <HiOutlineDotsHorizontal />
      </span>
    ),
  },
  {
    id: 2,
    EntityName: "Beetlejuice",
    Name: "1988",
    CreatedBy: "sam",
    CreatedOn: "02/12/2023",
    Status: "Approved",
    Visible: (
      <span>
        {" "}
        <MdVisibility /> <HiOutlineDotsHorizontal />
      </span>
    ),
  },
  {
    id: 3,
    EntityName: "Beetlejuice",
    Name: "1988",
    CreatedBy: "sam",
    CreatedOn: "02/12/2023",
    Status: "Approved",
    Visible: (
      <span>
        {" "}
        <MdVisibility /> <HiOutlineDotsHorizontal />
      </span>
    ),
  },
  {
    id: 4,
    EntityName: "Beetlejuice",
    Name: "1988",
    CreatedBy: "sam",
    CreatedOn: "02/12/2023",
    Status: "Approved",
    Visible: (
      <span>
        {" "}
        <MdVisibility /> <HiOutlineDotsHorizontal />
      </span>
    ),
  },
  {
    id: 5,
    EntityName: "Beetlejuice",
    Name: "1988",
    CreatedBy: "sam",
    CreatedOn: "02/12/2023",
    Status: "Approved",
    Visible: (
      <span>
        {" "}
        <MdVisibility /> <HiOutlineDotsHorizontal />
      </span>
    ),
  },
];

const TemplateJson = (props) => {
  const [showTemplateMultiform, setShowTemplateMultiform] = useState(false);

  const handleNavLinkClick = (componentName) => {
    console.log("Button clicked!");
    setShowTemplateMultiform(true);
    // Other logic you may want to perform when the button is clicked
  };

  const closeTemplateMultiform = () => {
    setShowTemplateMultiform(false);
  };
  const columnStyle = {
    border: "1px solid #000", // Replace with your desired border properties
    padding: "10px", // Optional: Add padding for spacing
  };

  return (
    <div>
      <Container fluid className={TemplateCSS.Temphead}>
        <Row className={`${TemplateCSS.Tempheaderbg}`}>
          <Stack direction="horizontal" gap={3}>
            <div
              style={{ border: "2px solid #000", padding: "10px" }}
              className={`${TemplateCSS.Tempheader}`}
            >
              <span>Tempaltes</span>
            </div>
            <div className={`p-2${TemplateCSS.Tempheader}`}>
              More Views <FaAngleDown />
            </div>

            <div className="p-2 ms-auto">
              <Button onClick={handleNavLinkClick}>Create</Button>
            </div>
          </Stack>
        </Row>

        {!showTemplateMultiform && <DataTable columns={columns} data={data} />}
        {showTemplateMultiform && (
          <TemplateMultiform onClose={closeTemplateMultiform} />
        )}
      </Container>{" "}
    </div>
  );
};
export default TemplateJson;
