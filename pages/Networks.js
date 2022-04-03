import { useState } from "react";
import ContactCard from "../components/contactForm";

export default function Networks({ contacts, sort }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="networks">
      <div className="top-bar">
        <button className="add" onClick={() => setShowForm(true)}>
          Add
        </button>
        {showForm ? <ContactCard close={() => setShowForm(false)} /> : null}
        <div className="search">
          <p className="network-count">156 networks</p>
          <select className="sort-order">
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="lastContact">Last Contacted</option>
          </select>
          <input
            className="search-field"
            type="test"
            placeholder="Name, email, job, company"
          />
        </div>
      </div>
      <div className="contacts-group">
        {contacts.sort(sort).map((contact) => (
          <div key={contact.name} className="contact-card">
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
