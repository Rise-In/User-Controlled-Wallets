"use client";
import React from "react";
import CreateWalletForm from "../components/createWalletForm";
import Lesson from "../components/lesson";
import { create_wallet_code } from "../components/codes";
import { create_wallet_markdown } from "../components/markdowns";

const CreateWallet = () => {
  const markdownString = create_wallet_markdown();
  const codeString = create_wallet_code();

  return (
    <div className="grid grid-rows-3">
      <div className="row-span-2 p-12">
        <Lesson markdown={markdownString} codeString={codeString} />
      </div>
      <div>
        <CreateWalletForm />
      </div>
    </div>
  );
};

export default CreateWallet;
