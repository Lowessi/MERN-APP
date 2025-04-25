const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-black flex flex-col">
      {/* Content */}

      <section className="bg-green-600 text-white py-24 text-center">
        <h3 className="text-xl font-semibold mb-2">Talk to us</h3>
        <h1 className="text-5xl font-bold">We'd love to hear from you</h1>
      </section>

      {/* Contact Intro */}
      <section className="bg-[#f3f4f6] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-black mb-4">
            Whether you have a question, a project idea, or just want to say
            hello — drop us a message!
          </p>
          <p className="text-lg text-gray-800">
            We're open to new opportunities and creative collaborations.
          </p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-[#f3f4f6] px-6 py-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 text-center text-gray-800">
          <div>
            <h4 className="text-xl font-bold mb-2 text-black">Address</h4>
            <p>Studio HQ</p>
            <p>123 Creative Street</p>
            <p>Melbourne, VIC 3000</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 text-black">Phone</h4>
            <p>+61 3 1234 5678</p>
            <p>Mon – Fri, 9am – 6pm</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 text-black">Email</h4>
            <p>hello@studiobrands.com</p>
            <p>We reply within 24 hours</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#f3f4f6] py-16 px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-6 text-black text-center">
            Send us a message
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
