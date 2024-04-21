import "./env.js"
import express from "express";
import EjsLayouts from "express-ejs-layouts";
import path from "path";
import ProjectController from "./src/controllers/project.controller.js";
import IssueController from "./src/controllers/issue.controller.js";
import { connectToDB } from "./config/mongoose.db.js";

connectToDB();
const server = express();
server.use(express.static("public"));
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),"src","views"));

server.use(EjsLayouts);
server.use(express.urlencoded({extended:true}));



const projectController = new ProjectController();
const issueController = new IssueController();

server.get("/",projectController.getProjects);
server.get("/create",projectController.getNewProjects);
server.post("/create",projectController.newProjects);
server.get("/projectDetails/:id",projectController.projectDetails);
server.post("/filter/:id",issueController.filteredIssue);
server.get("/newIssue/:id",issueController.getIssuePage);
server.post("/newIssue/:id",issueController.newIssue);
server.get("/delete/:id",projectController.deleteProjects);
server.get("/deleteIssue/:id",issueController.deleteIssue)
server.use(express.static("src/views"));

// const port = 3200;
server.listen(process.env.PORT);

console.log(`server is listening at http:localhost:${process.env.PORT}`)