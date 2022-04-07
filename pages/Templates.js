import { useEffect, useState } from "react";
import TemplateEditor from "./templateEditor";

export default function Templates({ templates }) {
    const [selectedTemplate, setSelectedTemplate] = useState(-1);
    const [currentTemplate, setCurrentTemplate] = useState(null);
    useEffect(() => {
        if (selectedTemplate != -1) {
            // We have a current template to modify
            setCurrentTemplate(templates[selectedTemplate]);
        }
        else {
            // There is no template to modify
            setCurrentTemplate(null);
        }
    }, [setCurrentTemplate, selectedTemplate]);

    return (
        <div className="templates">
            <div className="controls">
                <p>{templates.length} templates</p>
                <button className="add-template">ADD</button>
            </div>
            <div className="left column">
                {templates.map((template, index) => (
                    // <div
                    //     key={contact.name}
                    //     className="inline-block w-96 h-80 bg-white ml-0 m-2.5 rounded-2xl shadow-md"
                    // >
                    //     <p key="name" className="font-bold">
                    //     {contact.name}
                    //     </p>
                    //     {
                    //     (contact.job && contact.company) && (
                    //         <p key="job" className="job">
                    //             {contact.job} @ {contact.company}
                    //         </p>
                    //     )
                    //     }
                    //     <p key="email" className="email">
                    //     {contact.email}
                    //     </p>
                    //     <p>Contact by {contact.nextContact}</p>
                    //     <button className="followup">Follow-Up</button>
                    // </div>
                    <div className="inline-block w-96 h-80 bg-white ml-0 m-2.5 rounded-2xl shadow-md">
                        <span
                            onClick={() => setSelectedTemplate(index)}
                            className={"cursor-pointer float-right" + (index == selectedTemplate ? " bg-red" : "")}
                        >
                            OPEN
                        </span>
                        <p className="font-bold">{template.name}</p>
                        <p className="font-bold">{template.subject}</p>
                        <p>{template.content}</p>
                    </div>
                ))}
            </div>
            {
                (currentTemplate != -1) && <TemplateEditor template={currentTemplate}/>
            }
        </div>
    );
};
