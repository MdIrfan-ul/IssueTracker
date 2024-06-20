import { ProjectModel } from "./project.Schema.js";
import { UserModel } from "./user.schema.js";


export const createNewProjects = async (projects)=>{
    try{
        const {pName,description,authorEmail}=projects;
        const author = await UserModel.findOne({email:authorEmail});
        if(!author){
            throw new Error('user not found');
        }

        const existingProjects = await ProjectModel.exists({pName,description,author:author._id});
        if(existingProjects){
            throw new Error('This Project Already Exist')
        }
        await new ProjectModel({pName,description,author:author._id}).save();
    }
    catch(error){
console.log(error);
throw new Error(error);
    }
    
}

export const getProjects = async ()=>{
    return await ProjectModel.find({}).populate('author','name');
}
export const getById = async (id)=>{
    return await ProjectModel.findById(id).populate('author','name');
}
export const getEmailById = async (id)=>{
    return await ProjectModel.findById(id).populate('author','email');
}

export const deleteById = async (id)=>{
    return await ProjectModel.findByIdAndDelete(id);
}