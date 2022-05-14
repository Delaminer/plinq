import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

export default function ContactForm({ onSubmit, close }) {
  const { control, register, handleSubmit } = useForm();

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="inline-block bg-white rounded-2xl shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-450 flex flex-col gap-y-4">
          <div className="flex flex-row text-2xl font-semibold">
            Add a new network
          </div>
          <div className="flex flex-row gap-4">
            <input
              {...register("firstName", { required: true })}
              placeholder={"First name *"}
              className="border border-black rounded-lg p-4 w-1/2 placeholder:text-black"
            />
            <input
              {...register("lastName", { required: true })}
              placeholder={"Last name *"}
              className="border border-black rounded-lg p-4 w-1/2 placeholder:text-black"
            />
          </div>
          <div className="flex flex-row">
            <input
              {...register("email")}
              placeholder={"Email"}
              className="border border-black rounded-lg p-4 w-full placeholder:text-black"
            />
          </div>
          <div className="flex flex-row gap-4">
            <input
              {...register("job")}
              placeholder={"Job title"}
              className="border border-black rounded-lg p-4 w-1/2 placeholder:text-black"
            />
            <input
              {...register("company")}
              placeholder={"Company name"}
              className="border border-black rounded-lg p-4 w-1/2 placeholder:text-black"
            />
          </div>
          <div className="flex flex-row">
            <input
              {...register("industry")}
              placeholder={"Industry"}
              className="border border-black rounded-lg p-4 w-full placeholder:text-black"
            />
          </div>
          <div className="flex flex-row">
            <input
              {...register("LinkedIn URL")}
              placeholder={"Website link"}
              className="border border-black rounded-lg p-4 w-full placeholder:text-black"
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-row border border-black rounded-lg p-4 w-1/2 placeholder:text-black">
              <Controller
                control={control}
                name="lastContact"
                render={({ field }) => {
                  const [enabled, enable] = useState(false)
                  return (
                    enabled ? (
                      <input
                        className={enabled ? "" : "hidden"}
                        type="date"
                        onChange={date => field.onChange(date)}
                      />
                    ) : (
                      <span onClick={() => enable(true)}>
                        Last contact
                      </span>
                    )
                  )
                }}
              />
            </div>
            <input
              {...register("interval", { valueAsNumber: true })}
              placeholder={"Interval (Days)"}
              className="border border-black rounded-lg p-4 w-1/2 placeholder:text-black"
            />
          </div>
          <div className="flex flex-row">
            <input
              {...register("interests")}
              placeholder={"Interests"}
              className="border border-black rounded-lg p-4 w-full placeholder:text-black"
            />
          </div>
          <div className="flex flex-row justify-end gap-2">
            <button
              className="px-4 py-2 border-2 border-purple-4 self-end rounded-lg w-32 text-purple-4 h-12 font-semibold text-sm"
              onClick={close}
            >
              Cancel
            </button>
            <button type="submit"
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
