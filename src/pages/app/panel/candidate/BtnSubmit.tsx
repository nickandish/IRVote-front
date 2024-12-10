import { Button } from "react-bootstrap";

interface BtnSubmitProps {
  onSubmit: () => void;
}

const BtnSubmit: React.FC<BtnSubmitProps> = ({ onSubmit }) => {
  return <Button onClick={onSubmit}>ثبت تغییرات</Button>;
};

export default BtnSubmit;
