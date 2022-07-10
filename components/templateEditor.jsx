import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiCopy } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { TypeIcon } from "./templates";
import { displayDate3 } from "./tools";

// Wrap an element in this to add a copy icon to the right of it
export const Copyable = ({ element, valueToCopy }) => (
  <div className="flex flex-row items-center">
    {element}
    <FiCopy
      size={25}
      className="cursor-pointer ml-5 shrink-0 mr-5"
      onClick={() => navigator.clipboard.writeText(valueToCopy)}
    />
  </div>
);

export default function TemplateEditor({
  template,
  close,
  editTemplate,
  deleteTemplate,
}) {
  const { control, register, handleSubmit } = useForm({
    defaultValues: template,
  });
  const [editing, setEditState] = useState(false);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-6 w-1/3 max-h-[80%] overflow-hidden flex flex-col">
        <div className="flex flex-row mb-5">
          <div className="flex flex-col mr-2">
            {editing ? (
              <div className="inline-block">
                <input
                  {...register("name")}
                  className="border border-black rounded-lg p-1 font-bold text-2xl"
                  placeholder="Template Title"
                />
              </div>
            ) : (
              <div>
                <div className="flex flex-row items-center gap-2">
                  <p key="name" className="inline-block font-bold text-2xl">
                    {template.name}
                  </p>
                  {template.type && (
                    <div className="inline-block gap-2">
                      <TypeIcon type={template.type} />
                    </div>
                  )}
                </div>
                {template.lastEdited && (
                  <p className="text-gray-4 text-xs">
                    Edited {displayDate3(new Date(template.lastEdited))}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="ml-auto mt-1">
            <CgClose size={25} className="cursor-pointer" onClick={close} />
          </div>
        </div>

        {editing ? (
          <input
            {...register("subject")}
            className="border border-black rounded-lg p-1"
            placeholder="Email subject"
          />
        ) : (
          <Copyable
            valueToCopy={template.subject}
            element={
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-gray-3">Subject</p>
                <div className="flex flex-row gap-3 items-center">
                  <p key="subject" className="font-bold text-gray-4">
                    {template.subject}
                  </p>
                </div>
              </div>
            }
          />
        )}

        <div className="scrollbar overflow-auto h-full">
          {editing ? (
            <textarea
              {...register("content")}
              className="border border-black rounded-lg p-1 w-full h-96"
              placeholder="Content"
            />
          ) : (
            <Copyable
              valueToCopy={template.content}
              element={
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-bold text-gray-3">Content</p>
                  <div className="gap-3 items-center overflow-hidden flex flex-col">
                    <p className="scrollbar custom-overflow overflow-x-auto">
                      {template.content}
                    </p>
                  </div>
                </div>
              }
            />
          )}
        </div>

        <div className="flex flex-row gap-2 mt-2 float-right justify-end">
          {editing ? (
            <button
              className="px-4 border-2 border-purple-4 bg-purple-4 rounded-lg text-white h-12 font-semibold text-base"
              onClick={() => {
                handleSubmit((data) => editTemplate(data))();
                setEditState(false);
              }}
            >
              Save
            </button>
          ) : (
            <button
              className="px-4 border-2 border-purple-4 rounded-lg text-purple-4 h-12 font-semibold text-base"
              onClick={() => setEditState(true)}
            >
              Edit
            </button>
          )}
          <button
            className="px-4 border-2 border-red rounded-lg text-red h-12 font-semibold text-base"
            onClick={() => {
              deleteTemplate();
              close();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
