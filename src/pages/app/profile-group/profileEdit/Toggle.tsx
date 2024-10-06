// src/pages/profile/Toggle.tsx

import React from "react";
import "./toggle.scss";

interface ToggleProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
}

const Toggle: React.FC<ToggleProps> = ({ title, value, onChange }) => {
  return (
    <div className="toggle-input">
      <label htmlFor={title}>{title}:</label>
      <input
        id={title}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Toggle;
