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
import { useState } from "react";

const defaultData = {
  contacts: [
    {
      name: "Bob Smith",
      job: "Product Designer",
      company: "LINK",
      email: "bob@bobville.com",
      lastContact: "February 26, 2022 00:00:00",
      nextContact: "April 1, 2022 00:00:00",
    },
    {
      name: "Alex Alexson",
      job: "Product Designer",
      company: "LINK",
      email: "alexson@umich.com",
      lastContact: "March 20, 2022 00:00:00",
      nextContact: "April 12, 2022 00:00:00",
    },
    {
      name: "Indiana Jones",
      job: "Product Designer",
      company: "LINK",
      email: "jones@movies.me",
      lastContact: "March 26, 2022 00:00:00",
      nextContact: "April 5, 2022 00:00:00",
    },
    {
      name: "Indiana Jones",
      job: "Product Designer",
      company: "LINK",
      email: "jones@movies.me",
      lastContact: "March 26, 2022 00:00:00",
      nextContact: "April 5, 2022 00:00:00",
    },
    {
      name: "Indiana Jones",
      job: "Product Designer",
      company: "LINK",
      email: "jones@movies.me",
      lastContact: "March 26, 2022 00:00:00",
      nextContact: "April 5, 2022 00:00:00",
    },
    {
      name: "Indiana Jones",
      job: "Product Designer",
      company: "LINK",
      email: "jones@movies.me",
      lastContact: "March 26, 2022 00:00:00",
      nextContact: "April 5, 2022 00:00:00",
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
              element={<Reminders contacts={state.contacts} />}
            ></Route>
            <Route
              path="my-networks"
              element={
                <Networks
                  contacts={state.contacts}
                  sort={(a, b) => a.name.localeCompare(b.name)}
                />
              }
            ></Route>
            <Route path="templates" element={<Templates />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}
