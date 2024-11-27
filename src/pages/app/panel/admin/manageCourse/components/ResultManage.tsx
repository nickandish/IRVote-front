import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Dropdown from "./DropDown";
import apiClient from "../../../../../../api/axios";
import { API_URLS } from "../../../../../../api/urls";
import { useDuration } from "../../../../../../api/contextApi/DurationContext";
import "../manageCourse.scss";

export interface DropdownOption {
  value: number;
  label: string;
}

const ResultManage = () => {
  const { durationId } = useDuration();

  const options = [
    { value: 0, label: "ویژه مدیران برگزارکننده و ناظران" },
    { value: 1, label: "فقط کاندیدها" },
    { value: 2, label: "رای دهندگان" },
    { value: 3, label: "اطلاع رسانی عمومی" },
  ];

  const [selectedOption, setSelectedOption] = useState<DropdownOption>(
    options[0]
  );

  const handleChange = (selectedOption: DropdownOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post(
        API_URLS.RESULT_DROPDOWN.replace(":id", String(durationId)),
        { Result_Show: selectedOption.value }
      );
      console.log("Result posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting result:", error);
    }
  };

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
        <Col className="col-12 col-md-5 button-result">
          <button onClick={handleSubmit}>
            <p>نهایی کردن نتیجه</p>
          </button>
        </Col>
      </Row>
    </Card>
  );
};

export default ResultManage;
