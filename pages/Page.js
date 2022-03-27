import { Routes, Route, BrowserRouter, Link, Redirect } from 'react-router-dom';
import Reminders from './Reminders';
import Networks from './Networks';
import Templates from './Templates';
import { useState } from 'react';

const defaultData = {
    contacts: [
        {
            name: 'Bob Smith',
            email: 'bob@bobville.com',
            lastContact: 'February 26, 2022 00:00:00',
            nextContact: 'April 1, 2022 00:00:00',
        },
        {
            name: 'Alex Alexson',
            email: 'alexson@umich.com',
            lastContact: 'March 20, 2022 00:00:00',
            nextContact: 'April 12, 2022 00:00:00',
        },
        {
            name: 'Indiana Jones',
            email: 'jones@movies.me',
            lastContact: 'March 26, 2022 00:00:00',
            nextContact: 'April 5, 2022 00:00:00',
        },
    ],
};

const Base = () => (
    <>
    <p>hi</p>
    {/* <Redirect to='/reminders'/> */}
    </>
    
)

export default function Page() {
    const [ state, setState ] = useState(defaultData);

    return (
        <main>
            <BrowserRouter>
                <nav>
                    <Link to='/reminders'>Reminders</Link>
                    <Link to='/networks'>Networks</Link>
                    <Link to='/templates'>Templates</Link>
                </nav>
                <Routes>
                    <Route path='/' element={<Base/>}></Route>
                    <Route path='/reminders' element={<Reminders contacts={state.contacts}/>}></Route>
                    <Route path='/networks' element={<Networks/>}></Route>
                    <Route path='/templates' element={<Templates/>}></Route>
                </Routes>
            </BrowserRouter>
        </main>
    );
};