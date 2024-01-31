import { React, useState } from "react";

const ResultField = ({ text, flag }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const trimText = (token) => {
    return token.slice(0, 5) + "..." + token.slice(-5);
  };

  return (
    <div className="relative group">
      <button
        className="absolute right-0 top-0 bg-purple-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-90 transition-opacity duration-200"
        onClick={() => copyToClipboard()}
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
      <div className="rounded-lg w-[%80] p-2 border-2 mx-8 flex justify-center">
        {flag ? trimText(text) : text}
      </div>
    </div>
  );
};

export default ResultField;
