import Reminders from "../components/follow-up";
import Networks from "../components/my-networks";
import Templates from '../components/templates';
import { useEffect, useState } from "react";
import React from "react";

const TemplateType = {
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
      name: "Bob Smith",
      firstName: "Bob",
      lastName: "Smith",
      job: "Product Designer",
      company: "LINK",
      email: "bob@bobville.com",
      lastContact: "February 26, 2022 00:00:00",
      nextContact: "April 1, 2022 00:00:00",
    },
    {
      name: "Alex Alexson",
      firstName: "Alex",
      lastName: "Alexson",
      job: "Product Designer",
      company: "LINK",
      email: "alexson@umich.com",
      lastContact: "March 20, 2022 00:00:00",
      nextContact: "April 12, 2022 00:00:00",
    },
  ],
  templates: [
    {
      name: "LinkedIn Conection",
      type: TemplateType.coldEmail,
      subject: "-",
      content:
        "Hi [Name], \n\nMy name is [Name] and I'm a student studying [Major] at [University]. I looked at your profile and I got interested in your experience. If you are open to it, ...",
    },
    {
      name: "Career Fair follow-up",
      type: TemplateType.followup,
      subject: "Nice meeting you, [Name]!",
      content:
        "Hi [Name], \n\nThank you for taking the time to talk with me at the [Event] today. I am grateful for the time you spent ...",
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
      className={
        "text-2xl ml-12" +
        (isActive
          ? " font-bold text-purple-4 underline underline-offset-8"
          : " font-normal")
      }
      href={to}
    >
      {children}
    </a>
  );
};

const Tab = ({ hash, path, element }) => {
  return <>
    {hash === path ? element : null}
  </>;
}

export default function Home() {
  const [state, setState] = useState(defaultData);
  const [windowHash, setWindowHash] = useState(window.location.hash);

  useEffect(async () => {
    if (chrome && chrome.storage && chrome.storage.sync)
      setState({ ...state, ...(await chrome.storage.sync.get("plinq")).plinq });

    window.addEventListener('hashchange',  () => setWindowHash(window.location.hash));
  }, []);

  return (
    <React.Fragment>
      <header>
        <div className="pl-24 bg-white">
          <img src="/logo.svg" className="pt-2.5"></img>
        </div>
        <nav className="p-6 pl-12 bg-white flex w-screen">
          <NavItem hash={windowHash} to="#follow-up">Follow-up</NavItem>
          <NavItem hash={windowHash} to="#my-networks">My Networks</NavItem>
          <NavItem hash={windowHash} to="#templates">Templates</NavItem>
        </nav>
      </header>
      <main>
        <div className="pr-24 pl-24 bg-gray-1">
          <Tab
            hash={windowHash}
            path="#follow-up"
            element={<Reminders contacts={state.contacts} />}
          ></Tab>
          <Tab
            hash={windowHash}
            path="#my-networks"
            element={
              <Networks
                contacts={state.contacts}
                sort={(a, b) => a.lastName.localeCompare(b.lastName)}
              />
            }
          ></Tab>
          <Tab
            hash={windowHash}
            path="#templates"
            element={<Templates templates={state.templates} />}
          ></Tab>
        </div>
      </main>
    </React.Fragment>
  );
}
