import { ProjectModel } from "./project.Schema.js";


export const createNewProjects = async (projects)=>{
    return await new ProjectModel(projects).save();
}

export const getProjects = async ()=>{
    return await ProjectModel.find({});
}
export const getById = async (id)=>{
    return await ProjectModel.findById(id);
}

export const deleteById = async (id)=>{
    return await ProjectModel.findByIdAndDelete(id);
}