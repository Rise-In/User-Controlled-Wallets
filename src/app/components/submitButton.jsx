import React from "react";

const SubmitButton = ({ button_text, button_function }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => {
          button_function();
        }}
        className="rounded-lg border-2 p-4 hover:bg-purple-700"
      >
        {button_text}
      </button>
    </div>
  );
};

export default SubmitButton;
