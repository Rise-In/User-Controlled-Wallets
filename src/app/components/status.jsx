import { React } from "react";

const Status = ({ status, flag }) => {
  return (
    <div
      className={
        flag === true && status === 201
          ? "rounded-lg w-[%80] p-2 border-2 mx-8 flex justify-center bg-green-700"
          : "rounded-lg w-[%80] p-2 border-2 mx-8 flex justify-center bg-red-500"
      }
    >
      {status}
    </div>
  );
};

export default Status;
