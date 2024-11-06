import "../../scss/header/header.scss";

interface HeaderProp {
  title: string;
}

const Header: React.FC<HeaderProp> = ({ title }) => {
  return (
    <header className="header text-center">
      <h2 className="fw-bold">{title}</h2>
      <div
        className="path"
        // fill="#6a5ae0"
        fill-opacity="1"
        // d="M1440,96L1360,133.3C1280,171,1120,245,960,277.3C800,309,640,299,480,261.3C320,224,160,160,80,128L0,96L0,0L80,0C160,0,320,0,480,0C640,0,800,0,960,0C1120,0,1280,0,1360,0L1440,0Z"
      ></div>
    </header>
  );
};

export default Header;
