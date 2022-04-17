import { useEffect, useState } from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import TemplateEditor from "./templateEditor";

const TypeIcon = ({type}) => (
    <p className={`${type.bg} ${type.tc} font-normal w-fit rounded-xl px-2`}>{type.name}</p>
);

export default function Templates({ templates }) {
    const [currentTemplate, selectTemplate] = useState(null);

    return (
        <div className="templates">
            <div className="pt-10">
                <p className="inline-block">{templates.length} templates</p>
                <button className="bg-purple-7 text-white rounded w-20 float-right">New</button>
            </div>
            <div className="left column">
                {templates.map(template => (
                    <div className="inline-block w-96 h-50 bg-white ml-0 m-2.5 p-5 rounded-2xl shadow-md">
                        <CgArrowsExpandRight
                            className="cursor-pointer float-right"
                            onClick={() => selectTemplate(template)}
                            size={25}
                        />
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