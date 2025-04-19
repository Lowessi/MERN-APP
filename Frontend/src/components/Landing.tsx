const Landing = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-between">
      {/* Header */}
      <header className="bg-green-600 text-white text-center py-24">
        <h1 className="text-4xl font-bold">Welcome to Freelance Hub</h1>
        <p className="text-xl mt-4">
          Your gateway to finding amazing freelance projects and talent!
        </p>
        <button className="mt-6 px-8 py-3 bg-white text-green-600 text-lg font-semibold rounded-lg hover:bg-gray-200">
          Get Started
        </button>
      </header>

      {/* Features */}
      <section className="flex justify-around mt-16 mb-16 px-4">
        <div className="bg-white shadow-lg m-2 rounded-lg p-8 text-center w-1/3">
          <h2 className="text-2xl font-semibold text-gray-800">
            Find Projects
          </h2>
          <p className="mt-4 text-gray-600">
            Browse thousands of freelance projects tailored to your skills.
          </p>
        </div>
        <div className="bg-white shadow-lg m-2 rounded-lg p-8 text-center w-1/3">
          <h2 className="text-2xl font-semibold text-gray-800">Post Jobs</h2>
          <p className="mt-4 text-gray-600">
            Looking for freelancers? Post your job and hire the best talent.
          </p>
        </div>
        <div className="bg-white shadow-lg m-2 rounded-lg p-8 text-center w-1/3">
          <h2 className="text-2xl font-semibold text-gray-800">
            Connect with Experts
          </h2>
          <p className="mt-4 text-gray-600">
            Find professionals with expertise in various fields.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 bg-gray-800 text-white">
        <p>&copy; 2025 Freelance Hub. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
