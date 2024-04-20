import { ProjectModel } from "./project.Schema.js";


export const createNewProjects = async (projects)=>{
    return await new ProjectModel(projects).save();
}

export const getProjects = async ()=>{
    return ProjectModel.find({});
}
export const getById = async (id)=>{
    return ProjectModel.findById(id);
}