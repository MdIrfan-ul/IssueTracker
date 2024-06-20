import "./env.js"
import express from "express";
import EjsLayouts from "express-ejs-layouts";
import path from "path";
import ProjectController from "./src/controllers/project.controller.js";
import IssueController from "./src/controllers/issue.controller.js";
import UserController from "./src/controllers/user.controller.js";
import { connectToDB } from "./config/mongoose.db.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { auth } from "./src/middlewares/auth.middleware.js";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
// import userController from "./src/controllers/user.controller.js";

connectToDB();
const server = express();
server.use(express.static("public"));
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),"src","views"));

server.use(EjsLayouts);
server.use(express.urlencoded({extended:true}));

server.use(session({
    secret:'M7xOu3ux1S',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false},
}));
server.use(cookieParser());

const userController = new UserController();
const projectController = new ProjectController();
const issueController = new IssueController();

// user Routes
server.get('/register',userController.getRegister);
server.get('/login',userController.getLoginPage);
server.post('/register',userController.addRegister);
server.post('/login',userController.LoginUser);
server.get("/logout",userController.logOut);


// project Routes
server.get("/",setLastVisit,auth,projectController.getProjectsPage);
server.get("/create",auth,projectController.getNewProjects);
server.post("/create",auth,projectController.newProjects);
server.get("/projectDetails/:id",auth,projectController.projectDetails);
server.post("/delete/:id",auth,projectController.deleteProjects);

// issue Routes
server.post("/filter/:id",issueController.filteredIssue);
server.get("/newIssue/:id",auth,issueController.getIssuePage);
server.post("/newIssue/:id",auth,issueController.newIssue);
server.get("/deleteIssue/:id",auth,issueController.deleteIssue);
server.get("/404",projectController.getErrorpage);
server.use(express.static("src/views"));


// const port = 3200;
server.listen(process.env.PORT);

console.log(`server is listening at http:localhost:${process.env.PORT}`)