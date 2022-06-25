import Reminders from "../components/follow-up";
import Networks from "../components/my-networks";
import Templates from "../components/templates";
import { useEffect, useState } from "react";
import React from "react";

export const TemplateType = {
  coldEmail: {
    name: "COLD EMAIL",
    bg: "bg-orange/20",
    tc: "text-orange",
  },
  followup: {
    name: "FOLLOW-UP",
    bg: "bg-purple-3/20",
    tc: "text-purple-3",
  },
};

const defaultData = {
  contacts: [
    {
      firstName: "Bob",
      lastName: "Smith",
      job: "Product Designer",
      company: "LINK",
      email: "bob@bobville.com",
      lastContact: "February 26, 2022 00:00:00",
      contactInterval: 14,
    },
    {
      firstName: "Alex",
      lastName: "Alexson",
      job: "Product Designer",
      company: "LINK",
      email: "alexson@umich.com",
      lastContact: "March 20, 2022 00:00:00",
      contactInterval: 7,
      website: "mywebsite.com",
      interests: ["Coffee", "Travel"],
      notes: [
        "Has been working on B2B products for 7 years.",
        "Previously at Cisco and Logitech as a Service Designer.",
      ],
    },
    {
      firstName: "Mr",
      lastName: "LinkedIn",
      linkedIn: `https://www.linkedin.com/in/michael-peng-0a669617b/`,
      email: "contact@cool.com",
      phone: "555-666-7788",
      website: "https://linkedin.profile.me",
    },
  ],
  templates: [
    {
      name: "LinkedIn Connection",
      type: TemplateType.coldEmail,
      subject: "-",
      content:
        "Hi [Name], \n\nMy name is [Name] and I'm a student studying [Major] at [University]. I looked at your profile and I got interested in your experience. If you are open to it, ...",
      lastEdited: "February 26, 2022 00:00:00",
    },
    {
      name: "Career Fair follow-up",
      type: TemplateType.followup,
      subject: "Nice meeting you, [Name]!",
      content:
        "Hi [Name],\n\nThank you for taking the time to talk with me at the [Event name] today. I am grateful for the time you spent reviewing [your materials] and recommending strategies for presenting them.\n\nI especially appreciate your offer to connect me to others in your network. I also added you on LinkedIn. I'll update my portfolio and let you know how it progresses." +
        "\n\nThank you for taking the time to talk with me at the [Event name] today. I am grateful for the time you spent reviewing [your materials] and recommending strategies for presenting them.\n\nI especially appreciate your offer to connect me to others in your network. I also added you on LinkedIn. I'll update my portfolio and let you know how it progresses." +
        "\n\nThank you for taking the time to talk with me at the [Event name] today. I am grateful for the time you spent reviewing [your materials] and recommending strategies for presenting them.\n\nI especially appreciate your offer to connect me to others in your network. I also added you on LinkedIn. I'll update my portfolio and let you know how it progresses.",
    },
    {
      name: "Informational Interview Re..",
      type: TemplateType.coldEmail,
      subject: "[Your name]—informational interview request",
      content:
        "Hi [Name], \n\nThank you for accepting my connection! My name is [Name] and I'm a student studying [Major] at the [University]. I came across the [Role name] position ...",
    },
  ],
};

const NavItem = ({ hash, to, children }) => {
  const isActive = hash === to;
  return (
    <a
      className={`text-2xl ${
        isActive ? "text-purple-4 underline underline-offset-8" : ""
      }`}
      href={to}
    >
      {children}
    </a>
  );
};

const Tab = ({ hash, path, element }) => {
  return <>{hash === path ? element : null}</>;
};

export default function Home() {
  const [state, setState] = useState(defaultData);
  const [windowHash, setWindowHash] = useState("");
  const [savedState, setSavedState] = useState({});

  useEffect(() => {
    // Set default window hash
    setWindowHash(window.location.hash);

    // Get data from storage
    const getData = async () => {
      if (typeof window !== "undefined") {
        window.addEventListener("hashchange", () =>
          setWindowHash(window.location.hash)
        );
      }
      if (chrome && chrome.storage && chrome.storage.local) {
        const savedData = {
          ...state,
          ...(await chrome.storage.local.get("plinq")).plinq,
        };
        setState(savedData);
        setSavedState(savedData);
      }
    };
    getData();
  }, []);

  // Save new data to storage
  useEffect(() => {
    const saveData = async () => {
      if (
        chrome &&
        chrome.storage &&
        chrome.storage.local &&
        state != savedState
      ) {
        // We have unsaved changes. Save them!
        await chrome.storage.local.set({ plinq: state });
        setSavedState(state);
      }
    };
    saveData();
  }, [state]);

  // Helper function used in managing contact data
  const followup = (contact) => {
    // Find the contact
    const index = state.contacts.indexOf(contact);
    if (index == -1) return;

    const last = new Date();
    last.setHours(0, 0, 0, 0);
    state.contacts[index] = {
      ...contact,
      lastContact: last.toString(),
      contactInterval: contact.contactInterval || 14,
    };
    setState({ ...state });
  };

  // Helper function used in creating a new contact
  const addContact = (contact) => {
    state.contacts.push({});
    editContact(state.contacts.length - 1, contact);
  };

  // Helper function used in editing an existing contact
  const editContact = (index, contact) => {
    // Modify the contact data:

    // Remove invalid data from the contact form
    for (let key in contact) {
      if (!contact[key] || contact[key] === "") {
        delete contact[key];
      }
    }
    // Extract data from interests as a string
    if (typeof contact.interests === "string")
      contact.interests = contact.interests.split(",");
    // Remove excess spaces and delete blank entries
    contact.interests = contact.interests
      .map((interest) => interest.trim())
      .filter((interest) => interest.length > 0);

    state.contacts[index] = contact;
    setState({ ...state });
  };

  const deleteContact = (index) => {
    if (index > -1 && index < state.contacts.length) {
      state.contacts.splice(index, 1);
    }
    setState({ ...state });
  };

<<<<<<< HEAD
  const editTemplate = (index, template) => {
    state.templates[index] = template;
    setState({ ...state });
  };

  const deleteTemplate = (index) => {
    if (index > -1 && index < state.templates.length) {
      state.templates.splice(index, 1);
    }
    setState({ ...state });
  };

=======
>>>>>>> e5d353f (Fix font size in extension)
  return (
    <div>
      <div className="bg-white">
        <div className="pl-24">
          <img src="/logo.svg" className="pt-2.5"></img>
        </div>
        <nav className="p-6 pl-24 flex flex-wrap gap-8">
          <NavItem hash={windowHash} to="#follow-up">
            Follow-up
          </NavItem>
          <NavItem hash={windowHash} to="#my-networks">
            My Networks
          </NavItem>
          <NavItem hash={windowHash} to="#templates">
            Templates
          </NavItem>
        </nav>
      </div>
      <main>
        <div className="px-24 bg-gray-1">
          <Tab
            hash={windowHash}
            path="#follow-up"
            element={
              <Reminders
                contacts={state.contacts}
                followup={followup}
                templates={state.templates}
              />
            }
          ></Tab>
          <Tab
            hash={windowHash}
            path="#my-networks"
            element={
              <Networks
                contacts={state.contacts}
                sort={(a, b) => a.lastName.localeCompare(b.lastName)}
                followup={followup}
                addContact={addContact}
                editContact={editContact}
                deleteContact={deleteContact}
              />
            }
          ></Tab>
          <Tab
            hash={windowHash}
            path="#templates"
            element={
              <Templates
                templates={state.templates}
                editTemplate={editTemplate}
                deleteTemplate={deleteTemplate}
              />
            }
          ></Tab>
        </div>
      </main>
    </div>
  );
}
