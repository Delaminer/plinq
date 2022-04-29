import { CgArrowsExpandRight } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { BsCheck, BsCheck2, BsFillCircleFill } from "react-icons/bs";

const calculateNextContact = (last, interval) => {
  last.setDate(last.getDate() + interval);
  return last;
}

const sort = (a, b) => 
  (new Date(a.lastContact).getTime() + a.contactInterval * 24 * 60 * 60 * 1000) - 
  (new Date(b.lastContact).getTime() + b.contactInterval * 24 * 60 * 60 * 1000);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dev",
];

// Display a date object as Jan 1
const nameText = (date) => `${months[date.getMonth()]} ${date.getDate()}`;
// Get the color to use based on a date
const colorTime = (date) => 
  (new Date().getTime() - date.getTime() > 0) ? "fill-red-1" : "fill-green-1";

// Convert an email, subject, and message into a link that generates this draft email
const emailLink = (email, subject, body) => 
`mailto:${email}?subject=${subject.replaceAll('\n', '%0A').replaceAll(' ', '%20')}&body=${body.replaceAll('\n', '%0A').replaceAll(' ', '%20')}`;

// Get the link to start a follow up email to a given contact
const followupLink = (contact) => emailLink(contact.email, 'Hello there!', `How are you, ${contact.firstName}?\nI hope you are doing well.\n\nBest,\nYour Name`);

export default function Reminders({ contacts }) {
  // console.log(colorTime(new Date(contacts[1].nextContact)))
  return (
    <div className="pt-9">
      {contacts.filter(c => c.lastContact != undefined && c.contactInterval).sort(sort).map((contact) => (
        <div
          key={contact.lastName + contact.firstName}
          className="inline-block bg-white rounded-2xl shadow-md p-6"
        >
          <div className="float-right">
            <BsFillCircleFill
              className={colorTime(calculateNextContact(new Date(contact.lastContact), contact.contactInterval))}
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
              {contact.job && contact.company && (
                <p key="job" className="text-gray-4">
                  {contact.job} @ {contact.company}
                </p>
              )}
            </div>
          </div>
          <div className="bg-gray-2 h-[1px] my-4" />
          <div className="flex flex-row justify-center gap-10">
            <div className="flex flex-col">
              <p className="text-sm text-gray-3 text-center">Last Contact</p>
              <p className="text-sm text-center">
                {nameText(new Date(contact.lastContact))}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-3 text-center">Next Contact</p>
              <p className="text-sm font-bold text-center">
                {nameText(calculateNextContact(new Date(contact.lastContact), contact.contactInterval))}
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
  );
}
