import imgLian from "../Image/lian.jpg";
import imgJadi from "../Image/jadi.jpg";
import imgLowis from "../Image/Lowis.jpg";
const team = [
  {
    name: "Lian Emmanuel Villaluz Bugtai",
    role: "Project Owner",
    education: "Bachelor of science in Information Technology",
    bio: "I’m still new to management, but I’ll do my best to manage the team.",
    image: imgLian,
  },
  {
    name: "Louise Czar Awit",
    role: "Lead Programmer",
    education: "Bachelor of science in Information Technology",
    bio: "I’m still new, but I’ll do my best to be your programmer.",
    image: imgLowis,
  },
  {
    name: "Edwin Jade Orogan Suerto",
    role: "Tester",
    education: "Bachelor of science in Information Technology",
    bio: "I’m still new to testing, but I’ll do my best to maintain your trust.",
    image: imgJadi,
  },
];

const About = () => {
  return (
    <div className="bg-[#1E222B] text-[#DED1B6]">
      {/* Header */}
      <section className="bg-[#948978] text-[#1E222B] py-24 text-center">
        <h3 className="text-xl font-semibold mb-2">What We Do</h3>
        <h1 className="text-5xl font-bold">
          Freelance designers, thinkers & collaborators
        </h1>
      </section>

      {/* Intro */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">
            We're a small team of freelance creatives led by Lian Emmanuel V.
            Bugtai, Louise Czar Awit, and Edwin Jade Suerto, helping clients
            bring their ideas to life with clarity, craft, and consistency —
            without the overhead of a traditional agency.
          </h2>
          <div className="flex flex-col md:flex-row gap-10 text-left text-[#DED1B6] text-lg">
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

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {team.map((member, index) => (
              <div
                key={index}
                className="flex items-start gap-6 bg-[#343941] p-6 rounded-2xl shadow-md"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border border-[#DED1B6]"
                />
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-[#948978] mb-1 italic">
                    {member.education}
                  </p>
                  <p>{member.bio}</p>
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
