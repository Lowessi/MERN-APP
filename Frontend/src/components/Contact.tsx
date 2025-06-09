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
            <p> Ormoc City</p>
            <p>Brgy. Cogon</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 text-black">Phone</h4>
            <p>+639513641101</p>
            <p>Mon – Fri, 9am – 6pm</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 text-black">Email</h4>
            <p>Lianbugta@gmail.com</p>
            <p>We reply within 24 hours</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
    </div>
  );
};

export default Contact;
