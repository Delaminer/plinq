import Head from 'next/head'
import { useState } from 'react'
import AddContactForm from './AddContactForm'

export default function Home() {
  const [editing, setEditState] = useState(false)
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

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>
    </div>
  )
};