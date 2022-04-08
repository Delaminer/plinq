import { useEffect, useState } from "react";
import TemplateEditor from "./templateEditor";

const Maximize = () => (
    <svg class="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="16 4 20 4 20 8" />  <line x1="14" y1="10" x2="20" y2="4" />  <polyline points="8 20 4 20 4 16" />  <line x1="4" y1="20" x2="10" y2="14" /></svg>
);

const TypeIcon = ({type}) => (
    // <p className={JSON.stringify(type)}>is a {JSON.stringify(type)}</p>
    <p className={`${type.bg} ${type.tc} font-normal w-fit rounded-xl px-2`}>{type.name}</p>
);

export default function Templates({ templates }) {
    // const [selectedTemplate, setSelectedTemplate] = useState(-1);
    const [currentTemplate, selectTemplate] = useState(null);
    // useEffect(() => {
    //     if (selectedTemplate != -1) {
    //         // We have a current template to modify
    //         setCurrentTemplate(templates[selectedTemplate]);
    //     }
    //     else {
    //         // There is no template to modify
    //         setCurrentTemplate(null);
    //     }
    // }, [setCurrentTemplate, selectedTemplate]);

    return (
        <div className="templates">
            <div className="pt-10">
                <p className="inline-block">{templates.length} templates</p>
                <button className="bg-purple-7 text-white rounded w-20 float-right">New</button>
            </div>
            <div className="left column">
                {templates.map(template => (
                    <div className="inline-block w-96 h-50 bg-white ml-0 m-2.5 p-5 rounded-2xl shadow-md">
                        <span
                            onClick={() => selectTemplate(template)}
                            className={"cursor-pointer float-right" + (currentTemplate === template ? " bg-red" : "")}
                        >
                            <Maximize/>
                        </span>
                        <p className="font-bold">{template.name}</p>
                        {template.type && <TypeIcon type={template.type}/>}
                        <p className="font-bold">{template.subject}</p>
                        <p>{template.content}</p>
                    </div>
                ))}
            </div>
            {
                (currentTemplate != null) && <TemplateEditor
                 template={currentTemplate}
                 close={() => selectTemplate(null)}
                 />
            }
        </div>
    );
};
