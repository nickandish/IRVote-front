import { Col, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "./menuPanel.scss";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

interface MenuPanelProps {
  menuItems: MenuItem[];
  header: string;
}

const MenuPanel: React.FC<MenuPanelProps> = ({ menuItems, header }) => {
  const location = useLocation();

  return (
    <>
      <Col className="menuPanel col-3">
        <Row className="menuPanel_top">
          <Col className="logo col-3">LOGO</Col>
          <Col className="col-9 h">{header}</Col>
        </Row>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={`menuPanel_menuItem py-2 align-items-center ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <Row>
              <Col className="col-auto icon">{item.icon}</Col>
              <Col className="title">{item.title}</Col>
            </Row>
          </NavLink>
        ))}
      </Col>
    </>
  );
};

export default MenuPanel;
