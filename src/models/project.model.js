import { ProjectModel } from "./project.Schema.js";


export const createNewProjects = async (projects)=>{
    try{
        const existingProjects = await ProjectModel.find().exists({projects});
        if(existingProjects){
            throw new Error('This Project Already Exist')
        }
        await new ProjectModel(projects).save();
    }
    catch(error){
console.log(error);
throw new Error(error);
    }
    
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