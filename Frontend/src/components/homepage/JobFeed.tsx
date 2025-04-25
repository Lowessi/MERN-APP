// components/JobFeed.jsx
const JobFeed = () => {
  const jobs = [
    {
      title: "Non voice position - Work from Home",
      company: "Cyberbacker Careers",
      location: "Remote - Cebu, Philippines",
      posted: "7 months ago",
    },
  ];

  return (
    <div className="py-5">
      <main className="w-200 p-4 rounded-[15px] shadow-sm border bg-white border-gray-300">
        <h2 className="text-xl font-semibold mb-4">Top job picks for you</h2>
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded shadow-sm border-gray-300 border"
            >
              <h3 className="text-blue-600 font-medium hover:underline cursor-pointer">
                {job.title}
              </h3>
              <p className="text-sm">{job.company}</p>
              <p className="text-xs text-gray-500">{job.location}</p>
              <p className="text-xs text-gray-400 mt-1">{job.posted}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobFeed;
