import { useCallback } from "react";
import { CgClose } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { TemplateType, AddTemplateType } from "../pages";

export default function TemplateForm({ close, onSubmit }) {

  const { register, handleSubmit, watch, setValue } = useForm();

  // If "Custom Type" is selected in the Tag/Type dropdown, show a prompt to creact a cutom type 
  const customType = watch("type") === "custom-type";

  const createCustomType = useCallback(() => {
    // Create a new custom type
    const type = AddTemplateType(watch('custom-type-name'));
    setValue('type', type.label);
  }, [setValue, watch, AddTemplateType]);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="inline-block bg-white rounded-2xl shadow-md p-6 w-1/3 max-h-[80%] overflow-hidden flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row mb-2">
            <div className="flex flex-col flex-grow">
              <p key="name" className="inline-block font-bold text-2xl">
                Create a Template
              </p>
              <input
                {...register("name")}
                className="border border-gray-4 rounded-lg p-2 w-full"
                placeholder="Template Title"
              />
            </div>
            <div className="ml-auto mt-1">
              <CgClose size={25} className="cursor-pointer" onClick={close} />
            </div>
          </div>
          <div className="flex flex-row">

          <select
            className="w-44 p-2 rounded-lg border border-gray-4 box-border"
            {...register("type")}
          >
            <option value="">Tag</option>
            {Object.entries(TemplateType).map(([key, { label }]) => 
              <option key={key} value={key}>{label}</option>
            )}
            <option value="custom-type">Custom Tag</option>
          </select>
          {customType && (
            <div className="border rounded-lg bg-purple-4 flex items-center pl-2 ml-2 flex-shrink">
              <input
                {...register("custom-type-name")}
                type="text"
                placeholder="Custom tag name"
                className="border-0 bg-purple-4 border-purple-4 w-32 bg-purple-4 text-white"
              />
              <button onClick={createCustomType} className="text-white pl-2 pr-2">+</button>
            </div>
          )}
          </div>

          <div className="w-full border-t border-gray-300 mb-3 mt-3"></div>

          <input
            {...register("subject")}
            className="border border-gray-4 rounded-lg p-2 mb-2"
            placeholder="Email subject"
          />

          <textarea
            {...register("content")}
            className="border border-gray-4 rounded-lg p-2 w-full h-96"
            placeholder="Content"
          />

          <div className="flex flex-row justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 border-2 border-purple-4 self-end rounded-lg w-32 text-purple-4 h-12 font-semibold text-sm"
              onClick={close}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-4 self-end rounded-lg w-32 text-white h-12 font-semibold text-sm"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
