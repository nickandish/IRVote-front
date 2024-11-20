import { Col, Row } from "react-bootstrap";
import "./menuPanel.scss";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

interface MenuPanelProps {
  menuItems: MenuItem[];
  header: string;
  onMenuItemClick: (path: string) => void;
}

const MenuPanel: React.FC<MenuPanelProps> = ({
  menuItems,
  header,
  onMenuItemClick,
}) => {
  return (
    <>
      <Col className="menuPanel col-3">
        <Row className="menuPanel_top">
          <Col className="logo col-3">LOGO</Col>
          <Col className="col-9 h">{header}</Col>
        </Row>
        {menuItems.map((item, index) => (
          <Row
            key={index}
            className="menuPanel_menuItem py-2 align-items-center"
            onClick={() => onMenuItemClick(item.path)}
          >
            <Col className="col-auto icon">{item.icon}</Col>
            <Col className="title">{item.title}</Col>
          </Row>
        ))}
      </Col>
    </>
  );
};

export default MenuPanel;
