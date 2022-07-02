import { CgClose } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";

export default function FollowupDialog({
  contact,
  templates,
  followup,
  close,
}) {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="flex flex-col gap-3 bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">
            {contact.firstName} {contact.lastName}
          </p>
          <CgClose size={25} className="cursor-pointer" onClick={close} />
        </div>
        <div className="flex gap-3 items-center">
          <MdOutlineEmail size={25} />
          <p>{contact.email}</p>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-3 font-bold">Choose a template</p>
          <select className="w-96 pl-4 rounded-lg border border-gray-3 box-border h-12 text-gray-4">
            <option value="">None</option>
            {templates.map((template) => (
              <option key={template.name} value={template.name}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-3 font-bold">
            Notes for this follow-up
          </p>
          <input
            className="w-96 rounded-lg border border-gray-3 placeholder:text-gray-3 pl-4 box-border h-12"
            placeholder="This will be only for your record!"
          />
        </div>
        <div className="mt-6 flex gap-8 justify-end">
          <button onClick={followup} className="text-gray-4 font-semibold">
            Mark as done
          </button>
          <button className="text-purple-4 font-semibold">Go to email</button>
        </div>
      </div>
    </div>
  );
}
