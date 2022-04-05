import {
  Routes,
  Route,
  BrowserRouter,
  NavLink,
  Navigate,
} from "react-router-dom";
import Reminders from "./reminders";
import Networks from "./networks";
import Templates from "./templates";
import { useState } from "react";

const defaultData = {
  contacts: [
    {
      name: "Bob Smith",
      email: "bob@bobville.com",
      lastContact: "February 26, 2022 00:00:00",
      nextContact: "April 1, 2022 00:00:00",
    },
    {
      name: "Alex Alexson",
      email: "alexson@umich.com",
      lastContact: "March 20, 2022 00:00:00",
      nextContact: "April 12, 2022 00:00:00",
    },
    {
      name: "Indiana Jones",
      email: "jones@movies.me",
      lastContact: "March 26, 2022 00:00:00",
      nextContact: "April 5, 2022 00:00:00",
    },
  ],
};

const Base = () => (
  <>
    <p>Welcome to Plinq! Please select a tab</p>
    {/* <Redirect to="/reminders" /> */}
  </>
);

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        "text-xl m-12" +
        (isActive ? " font-bold text-purple-7" : " font-normal")
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
      <div className="pl-24">
        <img src="/logo.svg" className="pt-2.5"></img>
      </div>
      <BrowserRouter>
        <nav className="m-12">
          <NavItem to="reminders">Reminders</NavItem>
          <NavItem to="networks">Networks</NavItem>
          <NavItem to="templates">Templates</NavItem>
        </nav>
        <div className="pr-24 pl-24 bg-gray-1 h-fit overflow-scroll">
          <Routes>
            <Route path="/" element={<Navigate to="/reminders" />}></Route>
            <Route
              path="reminders"
              element={<Reminders contacts={state.contacts} />}
            ></Route>
            <Route
              path="networks"
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
