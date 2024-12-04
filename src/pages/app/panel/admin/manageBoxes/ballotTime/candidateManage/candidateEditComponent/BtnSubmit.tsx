import { Button } from "react-bootstrap";

interface BtnSubmitProps {
  onSubmit: (event: React.FormEvent) => void;
}

const BtnSubmit: React.FC<BtnSubmitProps> = ({ onSubmit }) => {
  return (
    <Button type="submit" onClick={onSubmit}>
      تایید کاندید
    </Button>
  );
};

export default BtnSubmit;
