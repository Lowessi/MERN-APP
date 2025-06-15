import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1E222B] flex flex-col justify-between">
      {/* Header */}
      <header className="bg-[#343941] text-white text-center py-24 px-4">
        <h1 className="text-4xl font-bold">Welcome to Freelance Hub</h1>
        <p className="text-xl mt-4 text-[#DED1B6]">
          Your gateway to finding amazing freelance projects and talent!
        </p>
        <button
          onClick={() => navigate("/register")}
          className="mt-6 px-8 py-3 bg-[#DED1B6] text-[#1E222B] text-lg font-semibold rounded-lg shadow-md hover:bg-[#948978] transition"
        >
          Get Started
        </button>
      </header>

      {/* Features */}
      <section className="flex flex-col md:flex-row justify-around mt-16 mb-16 px-4 gap-8 items-center">
        <div className="bg-[#DED1B6] shadow-lg rounded-lg p-8 text-center w-full md:w-1/3">
          <h2 className="text-2xl font-semibold text-[#343941]">Find Projects</h2>
          <p className="mt-4 text-[#948978]">
            Browse thousands of freelance projects tailored to your skills.
          </p>
        </div>

        <div className="bg-[#DED1B6] shadow-lg rounded-lg p-8 text-center w-full md:w-1/3">
          <h2 className="text-2xl font-semibold text-[#343941]">Post Jobs</h2>
          <p className="mt-4 text-[#948978]">
            Looking for freelancers? Post your job and hire the best talent.
          </p>
        </div>

        <div className="bg-[#DED1B6] shadow-lg rounded-lg p-8 text-center w-full md:w-1/3">
          <h2 className="text-2xl font-semibold text-[#343941]">Connect with Experts</h2>
          <p className="mt-4 text-[#948978]">
            Find professionals with expertise in various fields.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
