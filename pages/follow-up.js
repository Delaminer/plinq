export default function Reminders({ contacts }) {
  return (
    <>
      {contacts
        .sort((a, b) => new Date(a.nextContact) - new Date(b.nextContact))
        .map((contact) => (
          <div
            key={contact.name}
            className="inline-block w-96 h-80 bg-white ml-0 m-2.5 rounded-2xl shadow-md"
          >
            <p key="name" className="font-bold">
              {contact.name}
            </p>
            {contact.job && contact.company && (
              <p key="job" className="job">
                {contact.job} @ {contact.company}
              </p>
            )}
            <p key="email" className="email">
              {contact.email}
            </p>
            <p>Contact by {contact.nextContact}</p>
            <button className="followup">Follow-Up</button>
          </div>
        ))}
    </>
  );
}
