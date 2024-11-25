import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Dropdown from "./DropDown";

export interface DropdownOption {
  value: string;
  label: string;
}

const ResultManage = () => {
  const options = [
    { value: "managers_observers", label: "فقط مدیران و ناظران" },
    { value: "managers_only", label: "فقط مدیران" },
    { value: "all_users", label: "همه کاربران" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption: DropdownOption) => {
    setSelectedOption(selectedOption);
  };

  console.log(selectedOption);
  return (
    <Card className="resultManage p-4 mt-3 mb-5">
      <Row>
        <p className="">نتایج انتخابات به چه گروهی نمایش داده شود</p>
      </Row>

      <Row>
        <Col className="col-12 col-md-6">
          <Dropdown options={options} onChange={handleChange} />
        </Col>
        <Col />
        <Col className="col-12 col-md-5">
          <p>نهایی کردن نتایج</p>
        </Col>
      </Row>
    </Card>
  );
};

export default ResultManage;
