import {
  Routes,
  Route,
  BrowserRouter,
  NavLink,
  Navigate,
} from "react-router-dom";
import Reminders from "./follow-up";
import Networks from "./my-networks";
import Templates from "./templates";
import { useEffect, useState } from "react";

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
      nextContact: "April 22, 2022 00:00:00",
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

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        "text-2xl ml-12" +
        (isActive
          ? " font-bold text-purple-4 underline underline-offset-8"
          : " font-normal")
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default function Home() {
  const [state, setState] = useState(defaultData);
  const [savedState, setSavedState] = useState({});

  // Get data from storage
  useEffect(async () => {
    if (chrome && chrome.storage && chrome.storage.sync) {
      const savedData = { ...state, ...(await chrome.storage.sync.get("plinq")).plinq };
      console.log(savedData)
      setState(savedData);
      setSavedState(savedData);
    }
  }, []);

  // Save new data to storage
  useEffect(async () => {
    console.log('new state')
    if (chrome && chrome.storage && chrome.storage.sync && state != savedState) {
      console.log('saving...')
      // We have unsaved changes. Save them!
      await chrome.storage.sync.set({"plinq": state});
      setSavedState(state);
    }
  }, [state]);

  return (
    <main>
      <div className="pl-24 bg-white">
        <img src="/logo.svg" className="pt-2.5"></img>
      </div>
      <BrowserRouter>
        <nav className="p-6 pl-12 bg-white flex w-screen">
          <NavItem to="follow-up">Follow-up</NavItem>
          <NavItem to="my-networks">My Networks</NavItem>
          <NavItem to="templates">Templates</NavItem>
        </nav>
        <div className="pr-24 pl-24 bg-gray-1">
          <Routes>
            <Route path="/" element={<Navigate to="/follow-up" />}></Route>
            <Route
              path="follow-up"
              element={<Reminders
                contacts={state.contacts}
                followup={contact => {
                  // Find the contact
                  const index = state.contacts.indexOf(contact);
                  const last = new Date()
                  const next = new Date(last)
                  // Next contact is in two weeks, 14 days from today
                  next.setDate(next.getDate() + 14)
                  state.contacts[index] = {... contact, 
                    lastContact: last.toString(), nextContact: next.toString()}
                  console.log('updating state!')
                  setState(state)
                }}  
              />}
            ></Route>
            <Route
              path="my-networks"
              element={
                <Networks
                  contacts={state.contacts}
                  sort={(a, b) => a.lastName.localeCompare(b.lastName)}
                />
              }
            ></Route>
            <Route
              path="templates"
              element={<Templates templates={state.templates} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}
