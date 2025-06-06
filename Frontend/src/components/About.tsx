const team = [
  {
    name: "Lian Emmanuel Villaluz Bugtai",
    role: "Project Owner",
    education: "Bachelor of science in Information Technology",
    bio: "I still new to management but i can do my best to manage the team",
    image: "20",
  },
  {
    name: "Louise Czar Awit",
    role: "Lead Programmer",
    education: "Bachelor of science in Information Technology",
    bio: "I am still new but ill do my best to be your programmer",
    image: "21",
  },
  {
    name: "Edwin Jade Suerto",
    role: "Tester",
    education: "Bachelor of science in Information Technology",
    bio: "I am still new to testing but ill do my best to maintain your trust to me",
    image: "23",
  },
];

const About = () => {
  return (
    <div>
      <section className="bg-green-600 text-white py-24 text-center">
        <h3 className="text-xl font-semibold mb-2">What We Do</h3>
        <h1 className="text-5xl font-bold">
          Freelance designers, thinkers & collaborators
        </h1>
      </section>

      <section className="bg-[#f3f4f6] py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-black mb-6">
            We're a small team of freelance creatives led by Lian Emmanuel V.
            Bugtai, Louise Czar Awit, and Edwin Jade Suerto, helping clients
            bring their ideas to life with clarity, craft, and consistency —
            without the overhead of a traditional agency.
          </h2>
          <div className="flex flex-col md:flex-row gap-10 text-left text-gray-700 text-lg">
            <p className="md:w-1/2">
              We value strong communication, thoughtful design, and reliable
              delivery. As freelancers, we build close working relationships
              with our clients and stay personally involved in every project. We
              keep things light but focused — with a balance of professionalism
              and personality.
            </p>
            <p className="md:w-1/2">
              You’ll work directly with experienced designers, not filtered
              through layers of management. Our process is nimble and adaptive,
              tailored to fit your goals and timeline — whether you need a full
              brand identity, a sleek website, or just a fresh creative
              perspective.
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
