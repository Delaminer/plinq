export default function Reminders({ contacts }) {
  return (
    <>
      {contacts.sort((a, b) => new Date(a.nextContact) - new Date(b.nextContact)).map(contact => (
        <div key={contact.name} className='contact-card'>
          <p key='name' className='name'>{contact.name}</p>
          <p key='email' className='email'>{contact.email}</p>
          <p>Contact by {contact.nextContact}</p>
          <button className='followup'>Follow-Up</button>
        </div>
      ))}
    </>
  );
};