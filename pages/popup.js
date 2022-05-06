import React from "react";
import PopupButton from "../components/popupButton";

export default function Popup() {
  return (
    <React.Fragment>
      <div className="pl-24 bg-white">
        <img src="/logo.svg" className="pt-2.5"></img>
      </div>
      <div className="flex flex-col">
        <PopupButton text={"Add from LinkedIn"} plus={true}></PopupButton>
        <PopupButton text={"Add manually"} plus={true}></PopupButton>
        <PopupButton text={"Reminders"} plus={false}></PopupButton>
        <PopupButton text={"Networks"} plus={false}></PopupButton>
        <PopupButton text={"Templates"} plus={false}></PopupButton>
      </div>
    </React.Fragment>
  );
}
