import { useState } from 'react'

export default function AddContactForm(props) {
  const [firstName, setFirstName] = useState('First Name');
  const [lastName, setLastName] = useState('Last Name');
  const [email, setEmail] = useState('test@google.com');

  return (
    <form>
      <label htmlFor="firstName">First name:</label>
      <input type="text" id="firstName" name="firstName"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />

      <label htmlFor="lastName">Last name:</label>
      <input type="text" id="lastName" name="lastName"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />

      <label htmlFor="email">Last name:</label>
      <input type="text" id="email" name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="submit"
        value="Add COntact!"
        onClick={event => {

          event.preventDefault();
          let contact = {
            firstName: firstName,
            lastName: lastName,
            name: `${firstName} ${lastName}`,
            email: email,
          };

          let contacts = localStorage.getItem('contacts')
          if (contacts == null) contacts = '[]';
          contacts = new Array(JSON.parse(contacts));
          contacts.push(contact);
          localStorage.setItem('contacts', JSON.stringify(contact));

          // chrome.storage.sync.get('plinq', ({ 'plinq': data }) => {
          //   console.log('Got back data', data);
          //   // data.contacts.push(contact);
          //   // chrome.storage.sync.set({ 'plinq': data });
          // });

          // props.closeForm();
        }}
      />
    </form>
  );
};