import React from "react";
import PopupButton from "../components/popupButton";

export default function Popup() {

  async function open(target) {
    await chrome.tabs.create({active: true, url: target});
  }

  async function addFromLinkedIn() {
    await chrome.storage.local.set({'liImporting': true});
    await open('https://www.linkedin.com/mynetwork/invite-connect/connections/');
  }

  return (
    <React.Fragment>
      <div className="pl-4 bg-white">
        <img src="/logo.svg" className="pt-2.5"></img>
      </div>
      <div className="flex flex-col p-4" style={{width: '16rem'}}>
        <PopupButton text={"Add from LinkedIn"} plus={true} onClick={addFromLinkedIn}></PopupButton>
        <PopupButton text={"Add manually"} plus={true}></PopupButton>
        <hr className="my-4" />
        <PopupButton text={"Reminders"} plus={false} onClick={() => open('index.html#follow-up')}></PopupButton>
        <PopupButton text={"Networks"} plus={false} onClick={() => open('index.html#my-networks')}></PopupButton>
        <PopupButton text={"Templates"} plus={false} onClick={() => open('index.html#templates')}></PopupButton>
      </div>
    </React.Fragment>
  );
}
