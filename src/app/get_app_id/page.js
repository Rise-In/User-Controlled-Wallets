"use client";
import { useState, React } from "react";
import { get_app_id } from "../api/get_app_id/route";
import { get_app_id_code } from "../components/codes";
import { get_app_id_markdown } from "../components/markdowns";
import Lesson from "../components/lesson";
import SubmitButton from "../components/submitButton";
import ResultField from "../components/resultField";

const GetAppIdPage = () => {
  const [appId, setAppId] = useState("the app id will appear here");
  const [buttonClicked, setButtonClicked] = useState(false);

  const markdownString = get_app_id_markdown();
  const codeString = get_app_id_code();

  const retrieve_app_id = async () => {
    const response = await get_app_id();
    console.log("your app id: " + response);
    setAppId(response);
    setButtonClicked(true);
  };

  return (
    <div className="grid grid-rows-3">
      <div className="row-span-2 p-12">
        <Lesson markdown={markdownString} codeString={codeString} />
      </div>
      <div className="grid grid-cols-2">
        <SubmitButton
          button_text="Get App ID"
          button_function={retrieve_app_id}
        />
        <div className="flex items-center justify-center">
          <ResultField text={appId} flag={buttonClicked} />
        </div>
      </div>
    </div>
  );
};

export default GetAppIdPage;
