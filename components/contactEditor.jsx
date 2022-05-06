import { useState } from "react";
import { CgArrowsExpandRight } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { FiLink } from "react-icons/fi";

export default function TemplateEditor({ contact, close }) {
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
                        <CgArrowsExpandRight size={25} className="cursor-pointer"
                        onClick={() => selectContact(contact)}
                        // onClick={() => setFollowup(contact)}
                        />
                    </div>
                </div>
                <div className="bg-gray-2 h-[1px] my-4" />
                <div className="flex flex-row">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold text-gray-3">Info</p>
                        <div className="flex flex-row gap-3 items-center">
                        <MdOutlineEmail size={20} />
                        <p key="email" className="email">
                            {contact.email}
                        </p>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <FiLink size={20} />
                            <p key="linkedin" className="email">
                                <a href={contact.linkedIn} target="_blank">
                                LinkedIn
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}