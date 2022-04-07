import { useState } from "react";
import ContactCard from "../components/contactForm";

export default function Networks({ contacts, sort }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="networks">
      <div className="flex py-9 items-center">
        {showForm ? <ContactCard close={() => setShowForm(false)} /> : null}
        <input
          className="w-96 rounded-lg bg-gray-1 border border-gray-3 placeholder:text-black pl-6 box-border h-12"
          placeholder="Search"
        />
        <select className="w-44 ml-12 bg-gray-1 pl-4 rounded-lg border border-gray-3 box-border h-12">
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="lastContact">Last Contacted</option>
        </select>
        <select className="w-44 ml-12 bg-gray-1 pl-4 rounded-lg border border-gray-3 box-border h-12">
          <option value="">Industry</option>
          <option value="tech">Tech</option>
          <option value="finance">Finance</option>
        </select>
        <div className="flex items-center justify-center ml-auto h-12 pl-3">
          156 networks
        </div>
        <button
          className="ml-8 px-4 py-2 bg-purple-5 text-sm self-end rounded-lg w-32 text-white h-12"
          onClick={() => setShowForm(true)}
        >
          Add
        </button>
      </div>
      <div>
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
