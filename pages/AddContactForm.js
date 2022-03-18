import { useState } from 'react'

export default function AddContactForm(props) {
  const [fname, setFName] = useState('First Name');
  const [lname, setLName] = useState('Last Name');
  return (
    <form>
      <label for="fname">First name:</label>
      <input type="text" id="fname" name="fname" 
      value={fname}
      onChange={e => setFName(e.target.value)}
      />
      <label for="lname">Last name:</label>
      <input type="text" id="lname" name="lname" 
      value={lname}
      onChange={e => setLName(e.target.value)}
      />
      <input
        type="submit"
        value="Add COntact!"
        onClick={() => {
          let contact = {};
          contact.name = 'Person Name';
          contact.email = 'email@email.com';
          chrome.storage.sync.get('plinq', ({'plinq': data}) => {
            data.contacts.push(contact);
            chrome.storage.sync.set({ 'plinq': data });
          });
          props.closeForm();
        }}
      />
    </form>
  );
};