import { React, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Lesson = ({ markdown, codeString }) => {
  const [codeCopied, setCodeCopied] = useState(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(codeString);
    setCodeCopied(true);
  };
  return (
    <div className="grid grid-cols-2 h-full gap-12">
      <div className="bg-black flex items-center justify-center rounded-lg border-2 h-full w-full">
        <pre
          className="p-4 w-full h-full overflow-auto hide-scrollbar"
          style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </pre>
      </div>
      <div className="relative group h-full w-full rounded-lg border-2">
        <button
          className="rounded p-2 absolute right-0 top-0 bg-purple-700 text-white opacity-0 group-hover:opacity-90 transition-opacity duration-200"
          onClick={() => copyToClipboard()}
        >
          {codeCopied ? "Copied!" : "Copy to Clipboard"}
        </button>
        <div className="hide-scrollbarc h-full w-full overflow-auto">
          <SyntaxHighlighter
            className="remove-padding h-full w-full"
            language="javascript"
            customStyle={{ padding: 0, margin: 0 }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
