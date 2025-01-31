import SummaryApi from "../../common";
import contact from "../../Assets/contact.jpg";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

// import { useState } from "react";

const ContactUsForm = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // Handle form submission
  const onSubmit = async (data) => {
    const newData = {
      username: data.firstname + " " + data.lastname,
      email: data.email,
      company: data.company,
      job: data.jobTitle,
      relationship: data.relationship,
      telephone: data.telephone,
      writingAbout: data.writingAbout,
      message: data.message,
    };
    console.log(newData);

    try {
      const response = await fetch(SummaryApi.addContact.url, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Form Filled Successfully!");
        reset(
          {
            firstname: "",
            lastname: "",
            email: "",
            company: "",
            jobTitle: "",
            relationship: "",
            telephone: "",
            writingAbout: "",
            message: "",
          },
          {
            keepErrors: false,
            keepTouched: false,
            keepDirty: false,
          }
        );
      } else {
        toast.error(result.message || "Failed to fill the form.");
      }
    } catch (error) {
      toast.error("Error while submitting form.", error);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className=" xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem] ">
        <Toaster position="top-right" />

        <div className="grid lg:grid-cols-2">
          <div className="px-4 mt-4 lg:flex lg:flex-col lg:justify-center lg:items-center ">
            <div className="mb-4 mt-2 text-sm md:text-lg">
              Fill out the form below and we will get back to you shortly
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <select
                  className="w-full px-4 py-2 bg-white border border-black focus:outline-none focus:ring focus:ring-blue-300"
                  defaultValue="1"
                  {...register("writingAbout", { required: true })}
                >
                  <option value="I am Writing about">
                    I am Writing about*
                  </option>
                  <option value="Sales Enquiry">Sales Enquiry</option>
                  <option value="Product Information">
                    Product Information
                  </option>
                </select>
                {errors.writingAbout && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <textarea
                  id="msg"
                  name="msg"
                  rows="2"
                  className="w-full px-4 py-2 bg-white border border-black focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Your message"
                  {...register("message", { required: true })}
                ></textarea>
                {errors.message && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4 lg:flex-row">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="w-full px-4 py-2 bg-white border border-black focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="First Name *"
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && (
                  <span className="text-sm text-red-500">
                    First name is required
                  </span>
                )}

                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="w-full px-4 py-2 bg-white border border-black focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Last Name *"
                  {...register("lastname", { required: true })}
                />
                {errors.lastname && (
                  <span className="text-sm text-red-500">
                    Last name is required
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4 lg:flex-row">
                <input
                  type="email"
                  id="emailid"
                  name="email"
                  className="w-full px-4 py-2 bg-white border border-black focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Email Id *"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    Email is required
                  </span>
                )}

                <input
                  type="tel"
                  id="tel"
                  name="telephone"
                  className="w-full px-4 py-2 bg-white border border-black focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Telephone *"
                  {...register("telephone", { required: true })}
                />
                {errors.telephone && (
                  <span className="text-sm text-red-500">
                    Telephone is required
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4 lg:flex-row">
                <input
                  type="text"
                  id="designation"
                  name="jobTitle"
                  className="w-full px-4 py-2 bg-white border border-black focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Job Title *"
                  {...register("jobTitle", { required: true })}
                />
                {errors.jobTitle && (
                  <span className="text-sm text-red-500">
                    Job Title is required
                  </span>
                )}

                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-2 bg-white border border-black focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Company *"
                  {...register("company", { required: true })}
                />
                {errors.company && (
                  <span className="text-sm text-red-500">
                    Company is required
                  </span>
                )}
              </div>

              <div>
                <select
                  className="w-full px-4 py-2 bg-white border border-black focus:outline-none focus:ring focus:ring-blue-300"
                  defaultValue="1"
                  {...register("relationship", { required: true })}
                >
                  <option value="Relationship with Jooneli">
                    Relationship with Jooneli*
                  </option>
                  <option value="Potential Customer">Potential Customer</option>
                  <option value="Customer">Customer</option>
                </select>
                {errors.relationship && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="px-4 py-2 text-white border-1 w-[80px] bg-rose-700 hover:bg-orange-300 hover:text-slate-400 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="relative px-4 mt-4 lg:mt-0  ">
            <div
              className="bg-center bg-no-repeat bg-cover shadow-md"
              style={{
                backgroundImage: `url(${contact})`,
              }}
            >
              <div className="h-64 sm:h-80 md:h-[300px] lg:h-[500px] xl:h-[600px]">
                <div className="absolute flex items-center justify-center">
                  <div className="p-4 text-center bg-red-600 bg-opacity-90 w-[90%] sm:w-[250px] max-w-sm mx-auto">
                    <h1 className="mb-2 text-lg font-bold text-white sm:text-2xl">
                      Contact Us
                    </h1>
                    <p className="text-sm text-white sm:text-base">
                      Get in touch to partner with us or for more information on
                      our products, careers, and certifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
