import { useState } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { calculateNextContact, sortDates, displayDate, addDaysToDate } from "./tools";
import FollowupDialog from "./followupDialog";

// Determine if followup is overdue
const followupOvedue = (contact) => {
  return (
    new Date().getTime() -
      calculateNextContact(
        new Date(contact.lastContact),
        contact.contactInterval
      ).getTime() >
    0
  );
};

export default function Reminders({ contacts, followup, templates, followupContact, gotoFollowup }) {
  const [currentFollowup, setCurrentFollowup] = useState(-1);

  {
    /* Only display contacts that are set up to receive reminders (have an existing last contact and a desired cotnact interval) */
  }
  contacts = contacts
    .filter(
      (c) => c.timesContacted && c.timesContacted.length && c.contactInterval
    )
    .sort(sortDates);

  return (
    <div>
      <div className="flex gap-4 py-9">
        <div className="flex items-center gap-2">
          <BsFillCircleFill className="fill-red-1" />
          <div>Past Due</div>
        </div>
        <div className="flex items-center gap-2">
          <BsFillCircleFill className="fill-green-1" />
          <div>Upcoming</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        {/* Only display contacts that are set up to receive reminders (have an existing last contact and a desired cotnact interval) */}
        {contacts.filter(c => c.lastContact != undefined && c.contactInterval).sort(sortDates).map((contact) => (
          <div
            key={contact.lastName + contact.firstName}
            className="w-96 flex-none bg-white rounded-2xl shadow-md p-6"
          >
            <div className="float-right">
              <BsFillCircleFill
                className={followupOvedue(contact) ? "fill-red-1" : "fill-green-1"}
              />
            </div>
            <div className="flex flex-row">
              <div className="mr-6 my-3">
                <img
                  src="/avatar.png"
                  width="56px"
                  height="56px"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col mr-2">
                <p key="name" className="font-bold text-2xl">
                  {contact.firstName} {contact.lastName}
                </p>
                <p key="job" className="text-gray-4">
                  {/* Only display what information is defined (with filter), and only add @ if there are multiple fields */}
                  {[contact.job, contact.company].filter(field => field).join(' @ ')}
                </p>
              </div>
            </div>
            <div className="bg-gray-2 h-[1px] my-4" />
            <div className="flex flex-row justify-center gap-10">
              <div className="flex flex-col">
                <p className="text-sm text-gray-3 text-center">Last contact</p>
                <p className="text-sm text-center">
                  {displayDate(new Date(contact.lastContact))}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-3 text-center">Next follow-up</p>
                <p className={`text-sm text-center font-bold ${followupOvedue(contact) ? "text-red" : ""}`}>
                  {displayDate(calculateNextContact(new Date(contact.lastContact), contact.contactInterval))}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-end gap-2 mt-7">
              <button
                className="px-6 border-2 border-purple-4 rounded-lg text-purple-4 h-12 font-semibold text-sm"
                onClick={() => window.open(followupLink(contact))}
              >
                Follow-Up
              </button>
              <button
                className="flex border-2 border-purple-4 rounded-lg text-purple-4 h-12 w-12 justify-center items-center font-semibold text-sm"
                onClick={() => followup(contact)}
              >
                <BsCheck2 size={30} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {followupContact && (
        <FollowupDialog
          contact={followupContact}
          templates={templates}
          followup={() => followup(followupContact)}
          close={() => gotoFollowup(null)}
        />
      )}
    </div>
  );
}
