
import { createNewProjects,deleteById,getById,getProjects } from "../models/project.model.js";
import {getIssuesById } from "../models/issue.model.js";
export default class ProjectController{
    async getProjects(req,res,next){
let projects = await getProjects();
res.render("projects",{projects:projects})
    }

    getNewProjects(req,res,next){
        res.render("createProject",{errorMessage:null});
    }
    async newProjects(req,res,next){
        try {
            const {pName,description,author} = req.body;
            const projects = {pName,description,author}
            await createNewProjects(projects);
            res.redirect("/")
        } catch (error) {
            console.log(error);
        }
    }
    async projectDetails(req,res,next){
        const id = req.params.id;
    
    // console.log('Project ID:', id); // Logging Project ID
    
    let projectDetails = await getById(id);
    let issueDetails = await getIssuesById(id); 
    
    // // Logging initial data
    // console.log('Initial Project Details:', projectDetails);
    // console.log('Initial Issue Details:', issueDetails);
    
    // Check if issueDetails is null or not
    if (!issueDetails) {
        issueDetails = [];
    } else {
        // Filter issues to get only the ones related to the project
        issueDetails = issueDetails.filter(issue => issue.projectId== id);
    }
    
    // Logging filtered issueDetails
    // console.log('Filtered Issue Details:', issueDetails);
    
    res.render("projectDetails", { projectDetails: projectDetails, issueDetails: issueDetails });
    }
    async deleteProjects(req,res,next){
        const id = req.params.id;
        await deleteById(id);
        res.redirect("/");
    }
}