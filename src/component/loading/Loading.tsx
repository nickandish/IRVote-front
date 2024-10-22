import { LiaBoxSolid } from "react-icons/lia";
import "./loading.scss";
import Header from "../../pages/navbar/Header";
import Navbar from "../../pages/navbar/Navbar";

const Loading = () => {
  return (
    <>
      <Header title="لودینگ" />
      <Navbar />
      <div className="loading">
        <LiaBoxSolid className="icon" />
        <div className="square" />
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Loading;
