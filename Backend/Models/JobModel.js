const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Budget: {
    type: Number,
    required: true,
  },
});

JobSchema.statics.PostJob = async function (Title, Description, Budget) {
  const Job = await this.create({ Title, Description, Budget });
  return Job;
};

module.exports = mongoose.model("JobModel", JobSchema);
