import { useState } from 'react'

export default function AddContactForm({ onSubmit, close }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form>
      <label htmlFor="name">First name:</label>
      <input type="text" id="name" name="name"
      placeholder='Name'
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <label htmlFor="email">Last name:</label>
      <input type="text" id="email" name="email"
      placeholder='email@email.com'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="submit"
        value="Add Contact!"
        onClick={event => {

          event.preventDefault(); // so the page does not reload
          let contact = {
            name: name,
            email: email,
          };

          onSubmit(contact);
        }}
      />

      <button onClick={close}>Cancel</button>
    </form>
  );
};