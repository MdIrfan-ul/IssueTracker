import { IssueModel } from "./issue.Schema.js";
import { UserModel } from "./user.schema.js";

export const createIssue = async (title,description,labels,authorEmail,projectId)=>{
    const author = await UserModel.findOne({email:authorEmail});
    if(!author){
        throw new Error('Author not found');
    }
    return await   new IssueModel({title,description, labels,author:author._id,projectId}).save();
}

export const getIssues = async ()=>{
    return await IssueModel.find({}).populate('author','name');
}
export const getIssuesById = async (projectId)=>{
    return await IssueModel.find({projectId:projectId}).populate('author','name');
}

export const deleteIssueById = async (id)=>{
return await IssueModel.findByIdAndDelete(id);
}
