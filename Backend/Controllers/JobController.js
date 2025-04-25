const JobModel = require("../Models/JobModel");

const PostJob = async (req, res) => {
  const { Title, Description, Budget } = req.body;

  try {
    const Job = await JobModel.PostJob(Title, Description, Budget);

    res.status(200).json({ Title: Job.Title, Description, Budget });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { PostJob };
