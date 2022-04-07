export default function TemplateEditor({ template }) {
    return (
        <div className="w-96 h-80 bg-purple-7 ml-0 m-2.5 rounded-2xl shadow-md absolute z-30 top-0">
            <div className="top-bar">
                <span>{template.name}</span>
            </div>
            <div className="subject">
                <label for="subject">Subject</label>
                <input id="subject" value={template.subject}></input>
            </div>
            <div className="content">
                <label for="content">Content</label>
                <input id="content" value={template.content}></input>
            </div>
            <div className="controls">
                <button>DELETE</button>
                <button>EDIT</button>
            </div>
        </div>
    );
}