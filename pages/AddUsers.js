import Head from "next/head";
import { useState, useEffect } from "react";
import AddContactForm from "./AddContactForm";
import Reminders from "./Reminders";

export default function AddUsers() {
  const [editing, setEditState] = useState(false);
  const [contacts, setContacts] = useState([]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };
  useEffect(() => {
    // Update localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // NextJS uses server side rendering, so localStorage must be inside a useEffect hook.
  useEffect(() => {
    let savedContacts = localStorage.getItem("contacts");
    if (savedContacts) setContacts(new Array(JSON.parse(savedContacts)));
    else localStorage.setItem("contacts", "[]");
  }, [setContacts]);

  // let contacts = localStorage.getItem('contacts')
  // if (contacts == null) contacts = '[]';
  // contacts = new Array(JSON.parse(contacts));
  // contacts.push(contact);
  // localStorage.setItem('contacts', JSON.stringify(contact));

  return (
    <div className="container">
      <Head>
        <title>Plinq</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to Plinq!</h1>

        {/* <img 
      src="https://media-exp1.licdn.com/dms/image/D4E03AQFaCL…eta&t=scTsf_Nn1CzG7GTZoGTGX_Lz3mpU3UNRMPvj6iP8YQ8"
      alt="new"
      /> */}

        {editing ? (
          <AddContactForm
            onSubmit={(contact) => {
              setEditState(false);
              addContact(contact);
            }}
            close={() => {
              setEditState(false);
            }}
          />
        ) : (
          <button onClick={() => setEditState(true)}>Add a contact</button>
        )}

        <p>Your reminders for today:</p>
        <Reminders contacts={contacts} />

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>
    </div>
  );
}
