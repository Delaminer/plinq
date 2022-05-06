import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GiClockwiseRotation } from "react-icons/gi";
import { FiLink } from "react-icons/fi";
import { calculateNextContact, nameText } from "./tools"

export default function TemplateEditor({ contact, close, followup }) {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="inline-block bg-white rounded-2xl shadow-md p-6">
                <div className="flex flex-row">
                    <div className="mr-6 my-3">
                        <img
                            src="/avatar.png"
                            width="56px"
                            height="56px"
                            className="rounded-full"
                        />
                    </div>
                    <div className="flex flex-col mr-2">
                        <p key="name" className="font-bold text-2xl">
                            {contact.firstName} {contact.lastName}
                        </p>
                        {contact.job && (
                            <p key="job" className="text-gray-4">
                                {contact.job} @ {contact.company}
                            </p>
                        )}
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
                            <p key="email">
                                {contact.email}
                            </p>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <FiLink size={20} />
                            <p key="linkedin">
                                <a href={contact.linkedIn} target="_blank">
                                    LinkedIn
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold text-gray-3">Contact</p>
                        {
                            (contact.lastContact != undefined && contact.contactInterval) ? (
                                <>
                                    <div className="flex flex-row gap-3 items-center">
                                        <AiOutlineClockCircle size={20} />
                                        <p key="last">
                                            Last: {nameText(new Date(contact.lastContact))}
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-3 items-center">
                                        <AiOutlineClockCircle size={20} />
                                        <p key="next">
                                            Next: {nameText(calculateNextContact(new Date(contact.lastContact), contact.contactInterval))}
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-3 items-center">
                                        <GiClockwiseRotation size={20} />
                                        <p key="interval">
                                            {contact.contactInterval} days
                                        </p>
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

                {
                    contact.interests && (
                        <div className="flex flex-row">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold text-gray-3">Interest</p>
                                <div className="flex flex-row gap-2 mt-2">
                                    {
                                        contact.interests.map(interest => (
                                            <div className="bg-gray-4/20 rounded-2xl px-3 py-1 text-gray-4 text-sm font-semibold">
                                                {interest.toUpperCase()}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    contact.notes && (
                        <div className="flex flex-row">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold text-gray-3">Notes</p>
                                <div>
                                    {
                                        contact.notes.map(note => (
                                            <div className="flex flex-row gap-2 mt-2 text-gray-5 text-sm">
                                                {note}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="flex flex-row gap-2 mt-2 float-right">
                    <button
                        className="px-4 border-2 border-purple-4 rounded-lg text-purple-4 h-12 font-semibold text-base"
                        onClick={() => alert("EDIT!")}
                    >
                        Edit
                    </button>
                    <button
                        className="px-4 border-2 border-red rounded-lg text-red h-12 font-semibold text-base"
                        onClick={() => alert("DELTE!")}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}