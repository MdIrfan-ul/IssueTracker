import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required for the issue"],
    minLength: [2, "title should be more than 2 characters"],
  },
  description: {
    type: String,
    required: [true, "description is required for the issue"],
    minLength: [2, "description should be more than 2 characters"],
  },
  labels: [{
    type: String,
    enum: ['frontend', 'backend', 'database', 'deployment', 'bug'],
    required:true,
    default:[]
}],
  author:{type:String,required:[true,"author is required for the issue"],minLength:[2,"author should be more than 2 characters"]},
  projectId:{type:mongoose.Schema.Types.ObjectId,
ref:"Project"},
timestamp:{type: Date,
  default: Date.now,
  get: function(timestamp) {
      // Convert the date to 12-hour format with AM/PM
      return timestamp.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
      });
  }}
});


export const IssueModel = mongoose.model("Issue",IssueSchema);