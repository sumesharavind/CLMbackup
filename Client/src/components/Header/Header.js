import React, { memo, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { GrStackOverflow } from "react-icons/gr";
import { CgFileDocument } from "react-icons/cg";
import { RiAdminLine } from "react-icons/ri";
import { RxClipboard } from "react-icons/rx";
import { LuClipboardSignature } from "react-icons/lu";
import { TfiClose } from "react-icons/tfi";
import { MdOutlineRoomPreferences } from "react-icons/md";
import {
  HiOutlineDocumentPlus,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { ImInsertTemplate } from "react-icons/im";
import Logo from "../images/logo.png";
import Soon from "../images/soon.png";

import NavDropdown from "react-bootstrap/NavDropdown";
import { MdOutlineMessage } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TiSpannerOutline } from "react-icons/ti";
import { FaPowerOff } from "react-icons/fa";
import {
  faPlusCircle,
  faBell,
  faQuestionCircle,
  faHistory,
  faUserCircle,
  faHome,
  faCheckDouble,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";
import HeaderCSS from "./Header.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserName from "../Profile/UserName";
import { useGlobalContext } from "../GlobalContext";
import useEntityPublisher from "../Publish/useEntityPublisher";
import Preferences from "../UserPrefrences/Preferences";

const Header = (props) => {
  const { state } = useGlobalContext();
  const navigate = useNavigate();
  const [isUpIcon, setIsUpIcon] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showUserTooltip, setShowUserTooltip] = useState(false);
  const { processNotifications } = useEntityPublisher();

  /**preference----muthupandi */
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  /**preference----muthupandi */
  const toggleUserTooltip = () => {
    setShowUserTooltip(!showUserTooltip);
  };

  const handleAnimationEnd = (event) => {
    if (!isUpIcon) event.target.classList.add(HeaderCSS["hideAfterAnimation"]);
  };
  const handleNavLinkClick = (componentName) => {
    // Call the callback function to change the displayed component in Home.js
    // setIsUpIcon(false);
    // alert(props.name)
    try {
      props.onComponentChange(componentName);
    } catch (error) {
      alert("hi");
    }
  };
  const handlePublishClick = () => {
    // Call the processNotifications function from useEntityPublisher
    processNotifications();
  };
  const Subheader = () => {
    setIsUpIcon(!isUpIcon);
  };

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid className={HeaderCSS.HeaderBg}>
        <Row>
          <Col xs={12} md={3} lg={2}>
            <Button className={HeaderCSS.HeaderArrowButton} onClick={Subheader}>
              {isUpIcon ? (
                <SlArrowUp className={HeaderCSS.ArrowIcon} />
              ) : (
                <SlArrowDown className={HeaderCSS.ArrowIcon} />
              )}
            </Button>
            <u1 className="p-2 m-lg-2 m-md-0 m-2">
              <img
                src={Logo}
                alt="Savic CLM"
                title="Savic CLM"
                className={HeaderCSS.savicLogo}
              />
            </u1>
          </Col>
          <Col xs={12} md={6} lg={7}>
            <form className="d-flex">
              <input
                className={HeaderCSS.formcontrol}
                type="text"
                placeholder="search"
                aria-label="search"
              />
              <p className="mt-2 m-4">
                <strong>Advanced</strong>
              </p>
            </form>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <span className={HeaderCSS.tooltip}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                className={`ms-5 ms-md-0 ms-lg-3 p-2  ${HeaderCSS.HeaderIcons}`}
              />
              <span className={HeaderCSS.tooltipText}>Create</span>
            </span>
            <span className={HeaderCSS.tooltip}>
              <FontAwesomeIcon
                onClick={() => props.onComponentChange("Notifications")}
                icon={faBell}
                className={`ms-4 ms-md-0 ms-lg-3 p-2  ${HeaderCSS.HeaderIcons}`}
              />
              <span className={HeaderCSS.notifyBg}>
                <span className={HeaderCSS.notifyCount}>
                  {state.nCount > 0 ? state.nCount : ""}
                </span>
              </span>
              <span className={HeaderCSS.tooltipText}>Notification</span>
            </span>
            <span className={HeaderCSS.tooltip}>
              <FontAwesomeIcon
                icon={faHistory}
                className={`ms-4 ms-md-0 ms-lg-3 p-2  ${HeaderCSS.HeaderIcons}`}
              />
              <span className={HeaderCSS.tooltipText}>Activity</span>
            </span>

            <span className={HeaderCSS.tooltip}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className={`ms-3 ms-md-0 ms-lg-3 p-2 ${HeaderCSS.HeaderIcons}`}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              />
              <div
                className={`offcanvas offcanvas-end ${HeaderCSS.sidenav}`}
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <div className={`offcanvas-header ${HeaderCSS.canvasHeader}`}>
                  <h5 className="offcanvas-title" id="offcanvasRightLabel">
                    Support
                  </h5>
                  <TfiClose
                    type="button"
                    className={HeaderCSS.closebtn}
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  />
                </div>
                <div className="offcanvas-body">
                  <h6>Help and Support</h6>
                  <img
                    src={Soon}
                    alt="Savic CLM"
                    title="Savic CLM"
                    className={`w-75 mx-5 my-5 ${HeaderCSS.savicSoon}`}
                  />
                </div>
              </div>

              <span className={HeaderCSS.tooltipText}>Help</span>
            </span>

            <span className={HeaderCSS.tooltip}>
              <FontAwesomeIcon
                onClick={toggleUserTooltip}
                icon={faUserCircle}
                className={`ms-3 ms-md-0 ms-lg-3 p-2  ${HeaderCSS.HeaderIcons}`}
              />

              <span className={HeaderCSS.tooltipText}>Logout</span>
              {showUserTooltip && (
                <div className={`w3-animate-zoom ${HeaderCSS.userDrop}`}>
                  <h6 className={HeaderCSS.userName}>{state.userName}</h6>
                  <span className="d-flex">
                    <MdOutlineMessage className="mt-1" />
                    <h6 className="ms-2 pb-1">Suggestion</h6>
                  </span>
                  <span onClick={openPopup} className="d-flex">
                    <MdOutlineRoomPreferences className="mt-1" />
                    <h6 className="ms-2 pb-1">Preferences</h6>
                  </span>
                  <span className="d-flex">
                    <IoSettingsOutline className="mt-1" />
                    <h6 className="ms-2 pb-1">Settings</h6>
                  </span>
                  <span className="d-flex">
                    <TiSpannerOutline className="mt-1" />
                    <h6 className="ms-2 pb-1">Admin Center</h6>
                  </span>
                  <span className="d-flex">
                    <FaPowerOff className="mt-1" />
                    <h6 className="ms-2" onClick={Logout}>
                      Logout
                    </h6>
                  </span>
                </div>
              )}
            </span>
          </Col>

          {/*{isUpIcon && (   */}
          <Col
            xs={12}
            lg={12}
            className={`${HeaderCSS.navbar} ${
              isUpIcon ? HeaderCSS.forwardAnimation : HeaderCSS.reverseAnimation
            }`}
            onAnimationEnd={handleAnimationEnd}
          >
            <Row className={HeaderCSS.NavbarBg}>
              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1  ${HeaderCSS.NavlinkBg}`}
                onClick={() => handleNavLinkClick("HeaderContent")}
              >
                <span className={HeaderCSS.HeadetItemsHover}>
                  <div className={`mb-auto ${HeaderCSS.text}`}>Home</div>
                  <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                    <FontAwesomeIcon
                      icon={faHome}
                      className={HeaderCSS.NavIcon}
                    />
                  </div>
                </span>
              </Col>
              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1  ${HeaderCSS.NavlinkBg}`}
              >
                <div className={`mb-auto ${HeaderCSS.text}`}>Agreements</div>
                <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                  <LuClipboardSignature className={HeaderCSS.NavIcon} />
                </div>
              </Col>
              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1  ${HeaderCSS.NavlinkBg}`}
              >
                <div className={`mb-auto ${HeaderCSS.text}`}>Requests</div>
                <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                  <HiOutlineDocumentPlus className={HeaderCSS.NavIcon} />
                </div>
              </Col>
              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1  ${HeaderCSS.NavlinkBg}`}
              >
                <div className={`mb-auto ${HeaderCSS.text}`}>Associations</div>
                <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                  <CgFileDocument className={HeaderCSS.NavIcon} />
                </div>
              </Col>
              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1  ${HeaderCSS.NavlinkBg}`}
              >
                <div className={`mb-auto ${HeaderCSS.text}`}>Compliances</div>
                <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                  <FontAwesomeIcon
                    icon={faCheckDouble}
                    className={HeaderCSS.NavIcon}
                  />
                </div>
              </Col>
              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1  ${HeaderCSS.NavlinkBg}`}
              >
                <div
                  className={`mb-auto ${HeaderCSS.text}`}
                  onClick={() => handleNavLinkClick("TemplateJson")}
                >
                  Templates
                </div>
                <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                  <ImInsertTemplate className={HeaderCSS.NavIcon} />
                </div>
              </Col>

              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1  ${HeaderCSS.NavlinkBg}`}
              >
                <div className={`mb-auto ${HeaderCSS.text}`}>Clauses</div>
                <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                  <FontAwesomeIcon
                    icon={faAlignLeft}
                    className={HeaderCSS.NavIcon}
                  />
                </div>
              </Col>
              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1 ${HeaderCSS.NavlinkBg}`}
              >
                <div className={HeaderCSS.navi}>
                  <NavDropdown
                    title={<span className="text-white">Configure</span>}
                    id="basic-nav-dropdown"
                    className={HeaderCSS.Navlink}
                  >
                    <div className={`${HeaderCSS.dropDownMenu}`}>
                      <NavDropdown.Item
                        onClick={() => handleNavLinkClick("Contracttype")}
                        className={HeaderCSS.subitem}
                        id="ContractNav"
                      >
                        Contract Types
                      </NavDropdown.Item>
                      <NavDropdown.Item>Bulk Contract Type</NavDropdown.Item>
                      <NavDropdown.Item onClick={handlePublishClick}>
                        Publish
                      </NavDropdown.Item>
                      <NavDropdown.Item>Last Publish Logs</NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleNavLinkClick("Splitpane")}
                        className={HeaderCSS.subitem}
                        id="MultistepNav"
                      >
                        Attribute
                      </NavDropdown.Item>
                      <NavDropdown.Item>Rules</NavDropdown.Item>
                      <NavDropdown.Item>Masterdata</NavDropdown.Item>
                      <NavDropdown.Item>Default Search Column</NavDropdown.Item>
                      <NavDropdown.Item>
                        Promote Configurations
                      </NavDropdown.Item>
                      <NavDropdown.Item>Cascade Teams</NavDropdown.Item>
                      <NavDropdown.Item>Linkage Type</NavDropdown.Item>
                      <NavDropdown.Item>Currencies</NavDropdown.Item>
                      <NavDropdown.Item>Clause Groups</NavDropdown.Item>
                      <NavDropdown.Item>Reason</NavDropdown.Item>
                      <NavDropdown.Item>System Configuration</NavDropdown.Item>
                    </div>
                  </NavDropdown>
                </div>
                <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                  <HiOutlineWrenchScrewdriver className={HeaderCSS.NavIcon} />
                </div>
              </Col>

              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1  ${HeaderCSS.NavlinkBg}`}
              >
                <div className={`mb-auto ${HeaderCSS.text}`}>Reports</div>
                <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                  <RxClipboard className={HeaderCSS.NavIcon} />
                </div>
              </Col>
              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1  ${HeaderCSS.NavlinkBg}`}
              >
                <div className={`mb-auto ${HeaderCSS.text}`}>Bulk Action</div>
                <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                  <GrStackOverflow className={HeaderCSS.NavIcon} />
                </div>
              </Col>
              <Col
                xs={4}
                md={3}
                lg={1}
                className={`p-lg-1  ${HeaderCSS.NavlinkBg}`}
              >
                <div className={`mb-auto ${HeaderCSS.text}`}>Admin</div>
                <div className={`mt-auto ${HeaderCSS.iconWrapper}`}>
                  <RiAdminLine className={HeaderCSS.NavIcon} />
                </div>
              </Col>
            </Row>
          </Col>
          {/*)}*/}
        </Row>
      </Container>
      <Preferences isOpen={isPopupOpen} onClose={setPopupOpen} />
    </>
  );
};

export default memo(Header);
