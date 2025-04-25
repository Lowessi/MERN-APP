const PostJob = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
          Post a New Job
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              //   value={job.title}
              //   onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Full Stack Developer"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              //   value={job.description}
              //   onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe the job responsibilities, requirements, and expectations..."
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium text-gray-700">
                Budget
              </label>
              <input
                type="text"
                name="budget"
                // value={job.budget}
                // onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="$500"
              />
            </div>
            <div className="flex-1"></div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
