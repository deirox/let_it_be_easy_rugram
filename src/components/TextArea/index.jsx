import React from "react";
import Button from "../Button";
import "./style.css";

const TextArea = ({
  value,
  setValue,
  placeholder,
  onSubmit,
  isLoading,
  buttonText,
}) => {
  return (
    <div className="cnTextAreaWrapper">
      <textarea
        className="cnTextArea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <Button
        className="cnTextAreaSendButton"
        disabled={isLoading}
        onClick={onSubmit}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default TextArea;
