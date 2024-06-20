
import { createNewProjects,deleteById,getById,getEmailById,getProjects } from "../models/project.model.js";
import {getIssuesById } from "../models/issue.model.js";
export default class ProjectController{
    async getProjectsPage(req,res,next){
let projects = await getProjects();
res.render("projects",{projects:projects,userEmail:req.session.userEmail})
    }

    getNewProjects(req,res,next){
        res.render("createProject",{errorMessage:null,userEmail:req.session.userEmail});
    }
    async newProjects(req,res,next){
        try {
            const {pName,description} = req.body;
            const authorEmail = req.session.userEmail;
            const projects = {pName,description,authorEmail};
            await createNewProjects(projects);
            let project = await getProjects();
            res.render('projects',{projects:project,userEmail:req.session.userEmail})
        } catch (error) {
            console.log(error);
            res.render('createProject',{errorMessage:error.message});
        }
    }
    async projectDetails(req,res,next){
        try{
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
    
    res.render("projectDetails", { projectDetails: projectDetails, issueDetails: issueDetails,userEmail:req.session.userEmail });
}catch(error){
    console.log(error);
    res.render("error")
}
    }
    async deleteProjects(req,res,next){
        try {
            const id = req.params.id;
       const projectFound =  await getEmailById(id);
        if(!projectFound){
            throw new Error('Project not found');
        }
        // Check if the user is authorized to delete the project
        // console.log(projectFound.author);
        // console.log(req.session.userEmail);
        
        if (projectFound.author.email !== req.session.userEmail) {
            throw new Error('You are not Authourized to Delete the Project');
        }
        
        await deleteById(id);
        var projects = await getProjects();
        res.render('projects',{projects:projects,userEmail:req.session.userEmail});

        } catch (error) {
            console.error('Error deleting project:', error);
            res.status(403).render("error",{errorMessage:error.message});
        }
        
    }
    getErrorpage(req,res,next){
        res.render("error",{errorMessage:null,userEmail:req.session.userEmail});
    }
}