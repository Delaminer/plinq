import Head from 'next/head'
import { useState, useEffect } from 'react'
import AddContactForm from './AddContactForm'
import Reminders from './Reminders'

export default function Home() {
  const [editing, setEditState] = useState(false)
  useEffect(() => {
    let c = window.localStorage.getItem('contacts')
    console.log('final result', c)
  }, [])
  return (
    <div className="container">
      <Head>
        <title>Plinq</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to Plinq!
        </h1>
     
     {/* <img 
      src="https://media-exp1.licdn.com/dms/image/D4E03AQFaCL…eta&t=scTsf_Nn1CzG7GTZoGTGX_Lz3mpU3UNRMPvj6iP8YQ8"
      alt="new"
      /> */}

        {editing ?
          <AddContactForm
            closeForm={() => setEditState(false)}
          />
          :
          <button
            onClick={() => setEditState(true)}
          >
            Add a contact
          </button>
        }

        <p>Your reminders for today:</p>
        <Reminders
          // storage={window && window.localStorage}
          storage={{getItem: () => '[]', setItem: () => {}}}
        />

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>
    </div>
  )
};