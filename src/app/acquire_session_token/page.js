"use client";
import { React, useState } from "react";
import { acquire_session_token } from "../api/acquire_session_token/route";
import { acquire_session_token_markdown } from "../components/markdowns";
import { acquire_session_token_code } from "../components/codes";
import Lesson from "../components/lesson";
import SubmitButton from "../components/submitButton";
import ResultField from "../components/resultField";

const AcquireSessionToken = () => {
  const [userToken, setUserToken] = useState("user token will appear here");
  const [encryptionKey, setEncryptionKey] = useState(
    "encryption key will appear here"
  );
  const [buttonClicked, setButtonClicked] = useState(false);

  const codeString = acquire_session_token_code();
  const markdownString = acquire_session_token_markdown();

  const retrieve_user_credentials = async () => {
    const response = await acquire_session_token();
    setUserToken(response.userToken);
    setEncryptionKey(response.encryptionKey);
    setButtonClicked(true);
  };

  return (
    <div className="grid grid-rows-3">
      <div className="row-span-2 p-12">
        <Lesson markdown={markdownString} codeString={codeString} />
      </div>
      <div className="grid grid-cols-2">
        <SubmitButton
          button_text="Get User Credentials"
          button_function={retrieve_user_credentials}
        />
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            <ResultField text={userToken} flag={buttonClicked} />
          </div>
          <div className="flex items-center justify-center">
            <ResultField text={encryptionKey} flag={buttonClicked} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcquireSessionToken;
