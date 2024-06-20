import { createIssue,deleteIssueById,getIssues,getIssuesById } from "../models/issue.model.js";
import { getById } from "../models/project.model.js";


export default class IssueController{
    async getIssuePage(req,res,next){
        try {
            const projectId = req.params.id;
            res.render("newissue", { projectDetails: { id: projectId } ,userEmail:req.session.userEmail}); 
        } catch (error) {
            console.log(error);
            res.redirect("/404");
        }
        
    }

    async newIssue(req,res,next){
        try {
            const { title, description, labels} = req.body;
            // console.log("req.body:", req.body);
            const authorEmail = req.session.userEmail;
            const projectId = req.params.id;
            await createIssue(title, description, labels, authorEmail, projectId);
            const projectDetails = await getById(projectId);
            // const projectDetails = await getIssuesById(projectId);
            // console.log(`projectDetails:${projectDetails}`);
            const issueDetails = await getIssuesById(projectId);
            res.render('projectDetails',{projectDetails:projectDetails,issueDetails:issueDetails,userEmail:req.session.userEmail});
        } catch (error) {
            console.log(error);
            res.redirect("/404")
        }
  
    }


    async filteredIssue(req, res, next) {
        try {
            let selectedLabels = req.body.selectedLabels;
    
        if (typeof selectedLabels === 'string' && selectedLabels !== 'Filter by Labels') {
            selectedLabels = selectedLabels.split(',').map(label => label.trim()); 
        } else {
            selectedLabels = []; 
        }
    
        const descriptionQuery = req.body.descriptionQuery ? req.body.descriptionQuery.toLowerCase() : '';
        const authorQuery = req.body.authorQuery ? req.body.authorQuery.toLowerCase() : '';
    
        // Fetching issues related to the project
        const issueDetails = await getIssuesById(req.params.id);
    
        // console.log('Request Project ID:', req.params.id); // Debugging line
        // console.log('Issue Details:', issueDetails); // Debugging line
    
        // Filter issues to get only the ones related to the project
        const projectIssues = issueDetails.filter(issue => issue.projectId == req.params.id);
    
        // console.log('Project Issues:', projectIssues); // Debugging line
    
        const filteredIssues = projectIssues.filter(issue => {
            const hasSelectedLabels = selectedLabels.length === 0 || selectedLabels.some(label => issue.labels.includes(label));
            const matchesDescription = issue.description.toLowerCase().includes(descriptionQuery.toLowerCase());
            const matchesAuthor = issue.author.name.toLowerCase().includes(authorQuery.toLowerCase());
    
            // console.log('Issue:', issue.title);
            // console.log('Has Selected Labels:', hasSelectedLabels);
            // console.log('Matches Description:', matchesDescription);
            // console.log('Matches Author:', matchesAuthor);


    
            return hasSelectedLabels && matchesDescription && matchesAuthor;
        });
    
        // console.log('Filtered Issues:', filteredIssues); // Debugging line
    
        if (filteredIssues.length === 0 || (selectedLabels.length === 0 && !descriptionQuery && !authorQuery)) {
            // console.log('No issues found'); // Debugging line
            res.render('filteredIssues', { message: "No Such Issue found" });
        } else {
            res.render('filteredIssues', { filteredIssues: filteredIssues, message: null });
        }
        console.log('Selected Labels:', selectedLabels);
        console.log('Description Query:', descriptionQuery);
        console.log('Author Query:', authorQuery);
        console.log('Issue Details:', issueDetails);
        console.log('Project Issues:', projectIssues);
        console.log('Filtered Issues:', filteredIssues);
        } catch (error) {
            console.log(error);
            res.redirect("/404")
        }
        
    }
    
    async deleteIssue(req,res,next){
        try {
            const id = req.params.id;
            await deleteIssueById(id);
            res.redirect("/#Projects");
        } catch (error) {
            console.log(error);
            res.redirect("/404");
        }

    }
    
}