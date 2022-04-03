export default function Networks({ contacts, sort }) {
    return (
        <div class='networks'>
            <div class='top-bar'>
                <button class='add'>Add</button>
                <div class='search'>
                    <p class='network-count'>156 networks</p>                
                    <select class='sort-order'>
                        <option value=''>Sort by</option>
                        <option value='name'>Name</option>
                        <option value='lastContact'>Last Contacted</option>
                    </select>
                    <input class='search-field' type='test' placeholder='Name, email, job, company'/>
                </div>
            </div>
            <div class='contacts-group'>
                {contacts.sort(sort).map(contact => (
                    <div key={contact.name} className='contact-card'>
                    <p key='name' className='name'>{contact.name}</p>
                    <p key='email' className='email'>{contact.email}</p>
                    <p>Contact by {contact.nextContact}</p>
                    <button className='followup'>Follow-Up</button>
                    </div>
                ))}
            </div>
        </div>
    );
};