import { useEffect, useState } from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import TemplateEditor from "./templateEditor";

const TypeIcon = ({ type }) => (
  <p
    className={`${type.bg} ${type.tc} text-sm font-semibold w-fit rounded-2xl px-2`}
  >
    {type.name}
  </p>
);

export default function Templates({ templates }) {
  const [currentTemplate, selectTemplate] = useState(null);

  return (
    <div className="templates">
      <div className="flex py-9 items-center flex-wrap">
        <input
          className="w-96 rounded-lg bg-gray-1 border border-gray-3 placeholder:text-black pl-6 box-border h-12 mr-12"
          placeholder="Search"
        />
        <select className="w-44 mr-6 bg-gray-1 pl-4 rounded-lg border border-gray-3 box-border h-12">
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="lastContact">Last Contacted</option>
        </select>
        <select className="w-44 mr-12 bg-gray-1 pl-4 rounded-lg border border-gray-3 box-border h-12">
          <option value="">Tags</option>
          <option value="tech">Follow-up</option>
          <option value="finance">Cold Email</option>
        </select>
        <div className="flex items-center justify-center ml-auto h-12">
          {templates.length} networks
        </div>
        <button className="ml-8 px-4 py-2 bg-purple-4 self-end rounded-lg w-32 text-white h-12 font-semibold text-sm">
          New
        </button>
      </div>
      <div className="flex flex-row">
        {templates.map((template) => (
          <div className="inline-block w-96 h-50 bg-white ml-0 m-2.5 p-5 rounded-2xl shadow-md">
            <CgArrowsExpandRight
              className="cursor-pointer float-right"
              onClick={() => selectTemplate(template)}
              size={25}
            />
            <p className="font-bold">{template.name}</p>
            {template.type && <TypeIcon type={template.type} />}
            <p className="font-bold">{template.subject}</p>
            <p>{template.content}</p>
          </div>
        ))}
      </div>
      {currentTemplate != null && (
        <TemplateEditor
          template={currentTemplate}
          close={() => selectTemplate(null)}
        />
      )}
    </div>
  );
}
