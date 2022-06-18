import { useMemo, useState } from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import ContactEditor from "../components/contactEditor";
import ContactForm from "../components/contactForm";
import { searchQueryRoughlyMatch } from "./tools";

export default function Networks({ contacts, followup, addContact, editContact, deleteContact }) {

  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [currentContact, selectContact] = useState(-1);
  const [sortMethod, setSortMethod] = useState('');
  const [filters, setFilters] = useState({});

  const sortFunction = useMemo(() => {
    if (sortMethod === 'name' || sortMethod === '') {
      return (a, b) => a.lastName.localeCompare(b.lastName);
    } else if (sortMethod === 'lastContact') {
      return (a, b) => new Date(a.lastContact).getTime() - new Date(b.lastContact).getTime();
    }
  }, [sortMethod]);

  function searchFilter(contacts, query) {
    return query.trim().length === 0 ? contacts : contacts.filter(ct => searchQueryRoughlyMatch(query, `${ct.firstName} ${ct.lastName} ${ct.job} ${ct.company}`));
  }

  return (
    <div className="networks">
      <div className="flex py-9 items-center flex-wrap gap-2">
        {/* {showForm ? <ContactCard close={() => setShowForm(false)} /> : null} */}
        <input
          className="w-72 rounded-lg bg-gray-1 border border-gray-3 placeholder:text-black pl-4 box-border h-12 mr-12"
          onChange={ev => setQuery(ev.target.value)}
          value={query}
          placeholder="Search"
        />
        <div className="flex gap-2 flex-wrap">
          <select className="w-44 bg-gray-1 pl-3 rounded-lg border border-gray-3 h-12"
              value={sortMethod} onChange={ev => setSortMethod(ev.target.value)}>
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="lastContact">Last Contacted</option>
          </select>
          <select className="w-44 bg-gray-1 pl-3 rounded-lg border border-gray-3 h-12">
            <option value="">Industry</option>
            <option value="tech">Tech</option>
            <option value="finance">Finance</option>
          </select>
        </div>
        <div className="flex items-center justify-center ml-auto h-12">
          {contacts.length} networks
        <button
          className="ml-8 px-4 py-2 bg-purple-4 self-end rounded-lg w-32 text-white h-12 font-semibold text-sm"
          onClick={() => setShowForm(true)}
          >
          Add
        </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {searchFilter(contacts, query).sort(sortFunction).map((contact, index) => (
          <div
            key={contact.lastName + contact.firstName}
            className="inline-block bg-white rounded-2xl shadow-md p-6"
          >
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
                <div className="flex flex-row gap-2 mt-2">
                  <div className="bg-purple-3/20 rounded-2xl px-3 py-1 text-purple-3 text-sm font-semibold">
                    B2B
                  </div>
                  <div className="bg-orange/20 rounded-2xl px-3 py-1 text-orange text-sm font-semibold">
                    Health
                  </div>
                </div>
              </div>
              <div className="ml-auto mt-1">
                <CgArrowsExpandRight size={25} className="cursor-pointer"
                  onClick={() => selectContact(index)}
                />
              </div>
            </div>
            <div className="bg-gray-2 h-[1px] my-4" />
            <div className="flex flex-row">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-gray-3">Info</p>
                <div className="flex flex-row gap-3 items-center">
                  <MdOutlineEmail size={20} />
                  <p key="email" className="email">
                    {contact.email}
                  </p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <FiLink size={20} />
                  <p key="linkedin" className="email">
                    <a href={contact.linkedIn} target="_blank">
                      LinkedIn
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentContact != -1 && (
        <ContactEditor
          contact={contacts[currentContact]}
          close={() => selectContact(-1)}
          followup={followup}
          setContact={contact => editContact(currentContact, contact)}
          deleteContact={() => deleteContact(currentContact)}
        />
      )}
      {showForm && (
        <ContactForm
          onSubmit={contact => {
            // Add the contact
            addContact(contact);
            // Close the form
            setShowForm(false);
          }}
          close={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
