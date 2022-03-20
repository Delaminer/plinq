export default function Reminders({ storage }) {
  let contacts = storage.getItem('contacts')
  console.log(contacts)
  if (contacts == null) {
    contacts = '[]';
    storage.setItem('contacts', contacts);
  }
  console.log(contacts)
  contacts = new Array(JSON.parse(contacts));
  contacts = contacts.map(contact => (
    <div key={contact.name}>
      <p>{contact.name}</p>
      <p>{contact.email}</p>
    </div>
  ))

  return (
    <>
      {contacts}
    </>
  );
};