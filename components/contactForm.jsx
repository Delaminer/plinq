import { useForm } from "react-hook-form";

export default function ContactForm({ onSubmit, close }) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="bg-white w-full h-full z-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="contact-form-container">
          <label htmlFor="firstName">First name</label>
          <input {...register("firstName")} />

          <label htmlFor="lastName">Last name</label>
          <input {...register("lastName")} />

          <label htmlFor="email">Email</label>
          <input {...register("email")} />

          <label htmlFor="linkedIn">LinkedIn</label>
          <input {...register("linkedIn")} />

          <label htmlFor="notes">Notes</label>
          <input {...register("notes")} />

          <input type="submit" />

          <button onClick={close}>Cancel</button>

          {/* <input
          type="submit"
          value="Add Contact!"
          onClick={(event) => {
            event.preventDefault(); // so the page does not reload
            let contact = {
              firstName: "",
              lastName: "",
              email: "",
              linkedIn: "",
              website: "",
              jobTitle: "",
              companyName: "",
              lastContact: new Date(),
              contactInterval: new Date(),
              interests: [],
              notes: "",
              interestsOptions: [
                "Programming",
                "Development",
                "Design",
                "Testing",
              ],
            };

            onSubmit(contact);
          }}
        />

        <button onClick={close}>Cancel</button> */}
        </div>
      </form>
    </div>
  );
}
