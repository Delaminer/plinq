export default function TemplateEditor({ template }) {
    return (
        <div className='template-editor'>
            <div className='top-bar'>
                <span>{template.name}</span>
            </div>
            <div className='subject'>
                <label for='subject'>Subject</label>
                <input id='subject' value={template.subject}></input>
            </div>
            <div className='content'>
                <label for='content'>Content</label>
                <input id='content' value={template.content}></input>
            </div>
            <div className='controls'>
                <button>DELETE</button>
                <button>EDIT</button>
            </div>
        </div>
    );
}