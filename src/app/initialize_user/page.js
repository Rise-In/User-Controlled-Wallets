"use client";
import { React, useState } from "react";
import { initialize_user } from "../api/initialize_user/route";
import { initialize_user_code } from "../components/codes";
import { initialize_user_markdown } from "../components/markdowns";
import Lesson from "../components/lesson";
import SubmitButton from "../components/submitButton";
import ResultField from "../components/resultField";

const InitializeUser = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [challengeId, setChallengeId] = useState(
    "the challenge id will appear here"
  );

  const markdownString = initialize_user_markdown();
  const codeString = initialize_user_code();

  const initialize = async () => {
    const response = await initialize_user();
    console.log(response);
    setChallengeId(response);
  };

  return (
    <div className="grid grid-rows-3">
      <div className="row-span-2 p-12">
        <Lesson markdown={markdownString} codeString={codeString} />
      </div>
      <div className="grid grid-cols-2">
        <SubmitButton
          button_text="Initialize User"
          button_function={initialize}
        />
        <div className="flex items-center justify-center">
          <ResultField text={challengeId} flag={buttonClicked} />
        </div>
      </div>
    </div>
  );
  S;
};

export default InitializeUser;
