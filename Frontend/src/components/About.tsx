const team = [
  {
    name: "Andrew O’Keeffe",
    role: "Director and founding partner",
    education: "Bachelor of Design (Graphic Design) (Honours), RMIT University",
    bio: "Andrew has over 15 years experience in Australia and the UK. He has worked with a broad spectrum of clients, ranging from grass roots cultural and sustainability organisations to multi-national corporations.",
    image: "https://via.placeholder.com/120x120?text=AO",
  },
  {
    name: "Mark O’Keeffe",
    role: "Director and founding partner",
    education: "Bachelor of Design (Graphic Design), RMIT University",
    bio: "Drawing on over 10 years industry experience, Mark sees every new project as an opportunity to raise the bar. Mark is also a passionate musician and design educator.",
    image: "https://via.placeholder.com/120x120?text=MO",
  },
  {
    name: "Eunice Yip",
    role: "Visual communicator",
    education: "Bachelor of Design (Communication Design), RMIT University",
    bio: "Originally from South East Asia, Eunice brings a unique perspective. She loves kerning, layout design, and believes print will never die.",
    image: "https://via.placeholder.com/120x120?text=EY",
  },
  {
    name: "Zoe Jazz",
    role: "Interactive Designer",
    education: "Advanced Diploma of Screen and Media, RMIT University",
    bio: "Zoe creates beautiful digital landscapes and enjoys leading frontend components from design to code.",
    image: "https://via.placeholder.com/120x120?text=ZJ",
  },
];

const About = () => {
  return (
    <div>
      <section className="bg-green-600 text-white py-24 text-center">
        <h3 className="text-xl font-semibold mb-2">Who we are</h3>
        <h1 className="text-5xl font-bold">
          Designers, thinkers & collaborators
        </h1>
      </section>
      <section className="bg-[#f3f4f6]  py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-black mb-6">
            Led by brothers Andrew and Mark O’Keeffe, we are a boutique brand
            communications agency where you get to deal directly with the
            creatives.
          </h2>
          <div className="flex flex-col md:flex-row gap-10 text-left text-gray-700 text-lg">
            <p className="md:w-1/2">
              We pride ourselves on our process, our craft and our attention to
              detail. We also put a lot of time into nurturing our relations
              with our clients. We believe in charm, good manners and
              punctuality. And a healthy dose of humour – we take pride in our
              work, but don’t take ourselves too seriously.
            </p>
            <p className="md:w-1/2">
              We’re agile, flexible, nimble, responsive and adaptive. There’s no
              agency hierarchy to trip over, no juniors making decisions about
              your brand or learning on your time – just a dedicated group of
              people who are all across, and focused on, your project.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#f3f4f6]  py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-black">
            Our Team
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            {team.map((member, index) => (
              <div
                key={index}
                className="flex items-start gap-6 bg-white p-6 rounded-2xl shadow-md"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1a1a]">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1 italic">
                    {member.education}
                  </p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
