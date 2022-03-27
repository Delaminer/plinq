export default function Reminders({ contacts }) {
  return (
    <>
      {contacts.sort((a, b) => new Date(a.nextContact) - new Date(b.nextContact)).map(contact => (
        <div key={contact.name} className='contact-card'>
          <p key='name'>{contact.name}</p>
          <p key='email'>{contact.email}</p>
          <button>Follow-Up</button>
        </div>
      ))}
    </>
  );
};