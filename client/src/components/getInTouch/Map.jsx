import React from "react";

const Map = () => {
  return (
    <div className="mb-[5rem]">
        <div className="mt-[5rem] mb-[2rem] max-w-[600px] pb-4 text-center items-center mx-auto animate-fadeInUp">
          <p className="text-2xl text-slate-800 md:text-3xl">
            Contact Us !! 
          </p>  
        </div>

        <div className="lg:grid lg:grid-cols-2 gap-[2rem] xl:mx-[12rem] md:mx-[4rem] mx-[2rem] animate-fadeInUp ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12789.247749855398!2d85.3095051!3d27.6819222!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19240dd21323%3A0xc3c94e19f8e6322b!2sJooneli%20Inc.!5e1!3m2!1sen!2snp!4v1733660161266!5m2!1sen!2snp"
            className="w-full lg:h-full md:h-[20rem] h-[20rem] transition-transform duration-500 ease-in-out hover:scale-110"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="map-image"
            referrerPolicy="no-referrer-when-downgrade"
            />

          
          
          <div className="md:mt-[3rem] mt-[2rem]">
            <div className="animate-fadeInUp">
              <p className="text-2xl text-black md:text-3xl">Get in Touch</p>
            </div>
            <form className="pt-4 text-black animate-fadeInUp">
            <div className="grid grid-cols-2 animate-fadeInUp">
                  <div className='flex flex-col pr-4'>
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      required
                      className="px-2 py-2 bg-white border-2"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="username">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      className="px-2 py-2 bg-white border-2"
                      required
                      placeholder="Enter your email"
                    
                    />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    autoComplete="off"
                    className="px-2 py-2 bg-white border-2"
                    placeholder="Your subject matter"
                 
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    autoComplete="off"
                    className="px-2 py-2 bg-white border-2"
                    placeholder="Enter your message..."
               
                  ></textarea>
                </div>
                <div className="items-center justify-center mt-4 text-center bg-red-600 text-emerald-50 hover:bg-red-400 hover:text-black">
                  <button type="submit" className="px-2 py-2">
                    Send Message
                  </button>
                </div>
            </form>

          </div>
        </div>
      
    </div>
  )
}

export default Map