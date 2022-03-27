export default function Networks() {
    return (
        <>
            <div class='top-bar'>
                <button>Add</button>
                <p>156 networks</p>                
                <select>
                    <option value=''>Sort by</option>
                    <option value='name'>Name</option>
                    <option value='lastContact'>Last Contacted</option>
                </select>
                <input type='test' placeholder='Name, email, job, company'/>
            </div>
            <div class='contacts-group'>
                
            </div>
        </>
    );
};