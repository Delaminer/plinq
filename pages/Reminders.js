export default function Reminders({ contacts }) {
  return (
    <>
      {contacts.map(contact => (
        <div key={contact.name} className='contact-card'>
          <p key='name'>{contact.name}</p>
          <p key='email'>{contact.email}</p>
        </div>
      ))}
    </>
  );
};