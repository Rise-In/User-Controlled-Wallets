"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";

let sdk;

function CreateWalletForm() {
  useEffect(() => {
    sdk = new W3SSdk();
  }, []);

  const [appId, setAppId] = useState(
    localStorage.getItem("appId") || "someAppId"
  );
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || "someUserToken"
  );
  const [encryptionKey, setEncryptionKey] = useState(
    localStorage.getItem("encryptionKey") || "someEncryptionKey"
  );
  const [challengeId, setChallengeId] = useState(
    localStorage.getItem("challengeId") || "someChallengeId"
  );

  const onChangeHandler = useCallback(
    (setState, key) => (e) => {
      const value = e.target.value;
      setState(value);
      localStorage.setItem(key, value);
    },
    []
  );

  const onSubmit = useCallback(() => {
    sdk.setAppSettings({ appId });
    sdk.setAuthentication({ userToken, encryptionKey });

    sdk.execute(challengeId, (error, result) => {
      if (error) {
        toast.error(`Error: ${error?.message ?? "Error!"}`);
        return;
      }
      toast.success(`Challenge: ${result?.type}, Status: ${result?.status}`);
    });
  }, [appId, userToken, encryptionKey, challengeId]);

  return (
    <div className="p-4 bg-white mx-12 rounded">
      <div className="grid grid-cols-5">
        <div>
          <TextField
            label="App Id"
            onChange={onChangeHandler(setAppId, "appId")}
            value={appId}
          />
        </div>
        <div>
          <TextField
            label="User Token"
            onChange={onChangeHandler(setUserToken, "userToken")}
            value={userToken}
          />
        </div>
        <div>
          <TextField
            label="Encryption Key"
            onChange={onChangeHandler(setEncryptionKey, "encryptionKey")}
            value={encryptionKey}
          />
        </div>
        <div>
          <TextField
            label="Challenge Id"
            onChange={onChangeHandler(setChallengeId, "challengeId")}
            value={challengeId}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button variant="contained" color="success" onClick={onSubmit}>
            Verify Challenge
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateWalletForm;
