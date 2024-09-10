import { Container } from "react-bootstrap";
import Header from "../../navbar/Header";
import Navbar from "../../navbar/Navbar";
import Box from "./Box";

const MyElection = () => {
  // const [boxes, setBoxes] = useState([]);

  // useEffect(() => {
  //   // Fetch data from API
  //   fetch("/api/boxes")
  //     .then((response) => response.json())
  //     .then((data) => setBoxes(data));
  // }, []);

  return (
    <>
      <Header title={"انتخابات من"} />
      {/* <div>
        {boxes.map((box, index) => (
          <BoxComponent
            key={index}
            borderColor={box.borderColor}
            titleColor={box.titleColor}
            title={box.title}
            details={box.details}
          />
        ))}
      </div> */}
      <Container className="my-elections">
        <Box />
      </Container>
      <Navbar />
    </>
  );
};

export default MyElection;
