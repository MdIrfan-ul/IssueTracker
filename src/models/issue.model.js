import { IssueModel } from "./issue.Schema.js";

export const createIssue = async (title,description,labels,author,projectId)=>{
    return await   new IssueModel({title,description, labels,author,projectId}).save();
}

export const getIssues = async ()=>{
    return await IssueModel.find({});
}
export const getIssuesById = async (projectId)=>{
    return await IssueModel.find({projectId:projectId});
}

