"use client";
import { useState, React } from "react";
import { create_a_new_user } from "../api/create_a_new_user/route";
import Lesson from "../components/lesson";
import SubmitButton from "../components/submitButton";
import ResultField from "../components/resultField";
import { create_a_new_user_markdown } from "../components/markdowns";
import { create_a_new_user_code } from "../components/codes";
import Status from "../components/status";

const CreateANewUser = () => {
  // TODO: modularize the code
  // TODO: create a status component
  const [status, setStatus] = useState("status should be 201");
  const [userId, setUserId] = useState("the user id will appear here");
  const [buttonClicked, setButtonClicked] = useState(false);

  const codeString = create_a_new_user_code();
  const markdownString = create_a_new_user_markdown();

  const create_user = async () => {
    const response = await create_a_new_user();
    setUserId(response.userId);
    setStatus(response.status);
    setButtonClicked(true);
  };

  return (
    <div className="grid grid-rows-3">
      <div className="row-span-2 p-12">
        <Lesson markdown={markdownString} codeString={codeString} />
      </div>
      <div className="grid grid-cols-2">
        <SubmitButton button_text="Greate User" button_function={create_user} />
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            <ResultField text={userId} flag={buttonClicked} />
          </div>
          <div className="flex items-center justify-center">
            <Status status={status} flag={buttonClicked} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateANewUser;
