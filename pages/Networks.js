import { useState } from "react";
import ContactCard from "../components/contactForm";

export default function Networks({ contacts, sort }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="networks">
      <div className="flex flex-row py-9">
        <button
          className="px-4 py-2 bg-[#cccccc] text-sm"
          onClick={() => setShowForm(true)}
        >
          ADD
        </button>
        {showForm ? <ContactCard close={() => setShowForm(false)} /> : null}
        <div className="flex flex-row justify-end w-full">
          <div className="ml-12 flex justify-center items-center">
            156 networks
          </div>
          <select className="ml-12 w-36 bg-gray-3 pl-4">
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="lastContact">Last Contacted</option>
          </select>
          <select className="ml-12 w-40 bg-gray-3 pl-4">
            <option value="">Industry</option>
            <option value="tech">Tech</option>
            <option value="finance">Finance</option>
          </select>
          <input
            className="ml-12 w-[560px] bg-gray-3 placeholder:text-black pl-6 "
            type="test"
            placeholder="Name, email, job, company"
          />
        </div>
      </div>
      <div className="">
        {contacts.sort(sort).map((contact) => (
          <div
            key={contact.name}
            className="inline-block w-96 h-80 bg-gray-1 ml-0 m-2.5 rounded-2xl shadow-md"
          >
            <p key="name" className="name">
              {contact.name}
            </p>
            <p key="email" className="email">
              {contact.email}
            </p>
            <p>Contact by {contact.nextContact}</p>
            <button className="followup">Follow-Up</button>
          </div>
        ))}
      </div>
    </div>
  );
}
