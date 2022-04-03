import {
  Routes,
  Route,
  BrowserRouter,
  NavLink,
  Redirect,
} from "react-router-dom";
import Reminders from "./Reminders";
import Networks from "./Networks";
import Templates from "./Templates";
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
    {/* <Redirect to='/reminders'/> */}
  </>
);

export default function Page() {
  const [state, setState] = useState(defaultData);

  return (
    <main>
      <BrowserRouter>
        <nav>
          <NavLink activeClassName="active" to="/reminders">
            Reminders
          </NavLink>
          <NavLink activeClassName="active" to="/networks">
            Networks
          </NavLink>
          <NavLink activeClassName="active" to="/templates">
            Templates
          </NavLink>
        </nav>
        <div className="lower">Test</div>
        <div className="base">
          <Routes>
            <Route path="/" element={<Base />}></Route>
            <Route
              path="/reminders"
              element={<Reminders contacts={state.contacts} />}
            ></Route>
            <Route
              path="/networks"
              element={
                <Networks
                  contacts={state.contacts}
                  sort={(a, b) => a.name.localeCompare(b.name)}
                />
              }
            ></Route>
            <Route path="/templates" element={<Templates />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}
