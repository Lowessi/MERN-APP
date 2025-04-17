const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-black flex flex-col">
      {/* Content */}
      <div className="flex-grow py-12 px-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">CONTACT</h1>
        <p className="text-xl mb-10">We’d ♡ to help!</p>
        <p className="mb-12 text-center max-w-xl text-black">
          We like to create things with fun, open-minded people. Feel free to
          say hello!
        </p>

        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12">
          {/* Form */}
          <form className="flex-1 space-y-6 bg-white p-10 shadow">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 bg-white text-black"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 bg-white text-black"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500der bg-white text-black"
            ></textarea>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-[#4a6735] text-white px-6 py-2 rounded-md transition"
              >
                Send
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="flex-1 p-10 shadow-md bg-white space-y-6">
            <div>
              <p className="font-semibold">PABLO JOB</p>
              <p className="border-b-2 w-[300px] border-green-600 pb-5 inline-block">
                Ormoc, Leyte
              </p>
            </div>
            <p className="border-b-2 w-[300px] border-green-600 pb-5 inline-block">
              📞 573-123-2310
            </p>
            <p></p>

            <p className="border-b-2 w-[300px] border-green-600 pb-5 inline-block">
              ✉️ jadibugtaiawit@gmail.com
            </p>

            <div className="flex gap-4 text-xl mt-4">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#f3f4f6] text-gray-400 text-sm text-center py-4">
        © {new Date().getFullYear()} Grover Web Design. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
