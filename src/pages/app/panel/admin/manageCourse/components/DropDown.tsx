import React, { useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { DropdownOption } from "./ResultManage";
import "../manageCourse.scss";

interface DropdownProps {
  options: DropdownOption[];
  onChange: (selectedOption: DropdownOption) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  useEffect(() => {
    if (options.length > 0) {
      onChange(options[0]);
    }
  }, [options, onChange]);

  const handleChange = (newValue: SingleValue<DropdownOption>) => {
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      isSearchable
      className="custom-dropdown"
      classNamePrefix="custom-dropdown"
      defaultValue={options[0]}
      isClearable={false}
    />
  );
};

export default Dropdown;
