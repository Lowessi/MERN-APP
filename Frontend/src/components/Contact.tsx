const Contact = () => {
  return (
    <div className="min-h-screen bg-[#1E222B] text-[#DED1B6] flex flex-col">
      {/* Header */}
      <section className="bg-[#948978] text-[#1E222B] py-20 text-center">
        <h3 className="text-xl font-semibold mb-2">Talk to us</h3>
        <h1 className="text-4xl font-bold">We'd love to hear from you</h1>
      </section>

      {/* Contact Intro */}
      <section className="bg-[#1E222B] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-[#DED1B6] mb-4">
            Whether you have a question, a project idea, or just want to say hello — drop us a message!
          </p>
          <p className="text-lg text-[#948978]">
            We're open to new opportunities and creative collaborations.
          </p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-[#1E222B] px-6 py-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 text-center text-[#DED1B6]">
          <div>
            <h4 className="text-xl font-bold mb-2 text-[#DED1B6]">Address</h4>
            <p>Ormoc City</p>
            <p>Brgy. Cogon</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 text-[#DED1B6]">Phone</h4>
            <p>+639513641101</p>
            <p>Mon – Fri, 9am – 6pm</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 text-[#DED1B6]">Email</h4>
            <p>Lianbugta@gmail.com</p>
            <p>We reply within 24 hours</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
