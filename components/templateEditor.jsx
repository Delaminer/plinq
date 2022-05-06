export default function TemplateEditor({ template, close }) {
  return (
    <div className="w-96 h-80 bg-white ml-0 m-2.5 rounded-2xl shadow-md absolute z-30 top-0">
      <div className="top-bar" key="top-bar">
        <span>{template.name}</span>
      </div>
      <div className="subject" key="subject">
        <label htmlFor="subject">Subject</label>
        <input id="subject" value={template.subject}></input>
      </div>
      <div className="content" key="content">
        <label htmlFor="content">Content</label>
        <input id="content" value={template.content}></input>
      </div>
      <div className="controls" key="controls">
        <button key="delete">DELETE</button>
        <button key="edit">EDIT</button>
        <button onClick={close} key="close">CLOSE</button>
      </div>
    </div>
  );
}