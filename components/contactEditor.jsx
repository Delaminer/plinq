import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GiClockwiseRotation } from "react-icons/gi";
import { BsFillTrashFill } from "react-icons/bs"
import { FiLink } from "react-icons/fi";
import { calculateNextContact, displayDate, displayDate2 } from "./tools"
import { Controller, useForm } from "react-hook-form";

export default function ContactEditor({ contact, close, followup, setContact, deleteContact }) {
  // contact.interests and contact.notes have to be defined as arrays
  if (!contact.interests) contact.interests = [];
  if (!contact.notes) contact.notes = [];

  const { control, register, handleSubmit } = useForm({ defaultValues: contact});
  const [editing, setEditState] = useState(false);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="inline-block bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-row">
          <div className="mr-6 my-3">
            <img
              src={contact.image || "/avatar.png"}
              width="56px"
              height="56px"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col mr-2">
            <p key="name" className="font-bold text-2xl">
              {contact.firstName} {contact.lastName}
            </p>
            {
              editing ? (
                <div>
                  <input
                    {...register("job")}
                    className="border border-black rounded-lg p-1"
                  />
                  @
                  <input
                    {...register("company")}
                    className="border border-black rounded-lg p-1"
                  />
                </div>
              ) : (
                <p key="job" className="text-gray-4">
                  {/* Only display what information is defined (with filter), and only add @ if there are multiple fields */}
                  {[contact.job, contact.company].filter(field => field).join(' @ ')}
                </p>
              )
            }
            <div className="flex flex-row gap-2 mt-2">
              <div className="bg-purple-3/20 rounded-2xl px-3 py-1 text-purple-3 text-sm font-semibold">
                B2B
              </div>
              <div className="bg-orange/20 rounded-2xl px-3 py-1 text-orange text-sm font-semibold">
                Health
              </div>
            </div>
          </div>
          <div className="ml-auto mt-1">
            <CgClose size={25} className="cursor-pointer" onClick={close} />
          </div>
        </div>
        <div className="bg-gray-2 h-[1px] my-4" />
        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-gray-3">Info</p>
            <div className="flex flex-row gap-3 items-center">
              <MdOutlineEmail size={20} />
              {
                editing ? (
                  <input
                    {...register("email")}
                    className="border border-black rounded-lg p-1"
                  />
                ) : (
                  <p key="email">
                    {contact.email}
                  </p>
                )
              }
            </div>
            <div className="flex flex-row gap-3 items-center">
              <FiLink size={20} />
              {
                editing ? (
                  <input
                    {...register("linkedIn")}
                    className="border border-black rounded-lg p-1"
                  />
                ) : (
                  <p key="linkedin">
                    <a href={contact.linkedIn} target="_blank">
                      LinkedIn
                    </a>
                  </p>
                )
              }
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-gray-3">Contact</p>
            {
              (contact.lastContact != undefined && contact.contactInterval) ? (
                <>
                
                  <div className="flex flex-row gap-3 items-center">
                    <AiOutlineClockCircle size={20} />
                    {
                      editing ? (
                        <Controller
                          control={control}
                          name="lastContact"
                          render={({ field }) => (
                            <input 
                            defaultValue={displayDate2(new Date(contact.lastContact))}
                            type="date" onChange={date => field.onChange(date)} />
                          )}
                        />
                      ) : (
                        <p key="last">
                          Last: {displayDate(new Date(contact.lastContact))}
                        </p>
                      )
                    }
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <AiOutlineClockCircle size={20} />
                    <p key="next">
                      Next: {editing ? "" : displayDate(calculateNextContact(new Date(contact.lastContact), contact.contactInterval))}
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <GiClockwiseRotation size={20} />
                    {
                      editing ? (
                        <input
                          {...register("contactInterval", { valueAsNumber: true })}
                          className="border border-black rounded-lg p-1"
                        />
                      ) : (
                        <p key="interval">
                          {contact.contactInterval} days
                        </p>
                      )
                    }
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-row gap-3 items-center">
                    <AiOutlineClockCircle size={20} />
                    <p key="no-contact">
                      Never contacted
                    </p>
                  </div>
                  <button
                    className="rounded-lg border-black border-2 font-semibold px-2"
                    onClick={() => followup(contact)}
                  >
                    Add to Follow-Ups
                  </button>
                </>
              )
            }
          </div>
        </div>

        {(contact.interests.length > 0 || editing) && (
          <div className="flex flex-row">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-gray-3">Interest</p>
              <div className="flex flex-row gap-2 mt-2">
                {editing ? (
                    <Controller
                      control={control}
                      name="interests"
                      render={({ field }) => (
                        <>
                          {field.value.map((interest, index) => (
                            <div key={index}
                              className="bg-gray-4/20 rounded-2xl px-3 py-1 text-gray-4 text-sm font-semibold flex items-center justify-center"
                            >
                              <input type="text" value={field.value[index]} onChange={event => {
                                field.value[index] = event.target.value;
                                field.onChange(field.value);
                                }}
                              />
                              <button className="ml-2 bg-red text-black p-1 rounded-lg"
                                onClick={() => field.onChange(field.value.filter((_, otherIndex) => otherIndex != index))}
                              ><BsFillTrashFill /></button>
                            </div>
                          ))}
                          <button
                            className="px-4 border-2 border-purple-4 bg-purple-4 rounded-lg text-white h-12 font-semibold text-base"
                            onClick={() => field.onChange([...field.value, ""])}
                          >
                            New
                          </button>
                        </>
                      )}
                    />
                  ) : (
                  contact.interests.map((interest, index) => (
                    <div key={index}
                    className="bg-gray-4/20 rounded-2xl px-3 py-1 text-gray-4 text-sm font-semibold flex items-center justify-center">
                      {interest.toUpperCase()}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {(contact.notes.length > 0 || editing) && (
          <div className="flex flex-row">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-gray-3">Notes</p>
              <div>
                {
                  !editing ? (
                    contact.notes.map((note, index) => (
                      <div key={index} className="flex flex-row gap-2 mt-2 text-gray-5 text-sm">
                        {note}
                      </div>
                    ))
                  ) : (
                    <Controller
                      control={control}
                      name="notes"
                      render={({ field }) => (
                        <textarea cols={50} rows={field.value.length + 1} 
                          onChange={event => field.onChange(event.target.value.split("\n"))}
                          className="border border-black rounded-md"
                          value={field.value.join("\n")}
                        />
                      )}
                    />
                  )
                }
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-row gap-2 mt-2 float-right">
          {
            editing ? (
              <button
                className="px-4 border-2 border-purple-4 bg-purple-4 rounded-lg text-white h-12 font-semibold text-base"
                onClick={() => {
                  handleSubmit(data => setContact(data))();
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
            )
          }
          <button
            className="px-4 border-2 border-red rounded-lg text-red h-12 font-semibold text-base"
            onClick={() => { deleteContact(); close(); }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}