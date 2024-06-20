import bcrypt from 'bcrypt';
import { addUser, checkUser } from '../models/user.model.js';
import { getProjects } from '../models/project.model.js';

export default class UserController{
    async getRegister(req,res){
        res.render('register',{errorMessage:null});
    }
    async getLoginPage(req,res){
        res.render('login',{errorMessage:null});
    }
    async addRegister(req,res){
        try {
            let {name,email,password} = req.body;
            // password = await bcrypt.hash(password,10);
            await addUser({name,email,password});
            res.render('login',{errorMessage:null});
        } catch (err) {
            let errorMessage=[];
            const errorMessageWithoutPrefix = err.message.replace(/^.+?:\s*/, '');
            console.log(errorMessageWithoutPrefix);

            let errorMessages = errorMessageWithoutPrefix.split(', ');
            // console.log(errorMessage);
            errorMessages.forEach(errorMessagePart => {
                const [field, msg] = errorMessagePart.split(': ');
                errorMessage.push({ field: field.trim(), msg });
            });
            console.log(errorMessage)
            // console.error('Error in registration:', err);
            res.render('register', { errorMessage:errorMessage });
        }
      
    }
    async LoginUser(req,res){
        try{
            const {email,password} = req.body;
            const user = await checkUser(email);
            if(!user){
                throw Error('Email is required to Login');
            }
            else{
                if(!password || password.length ===0){
                    throw new Error('Password is required to Login');
                }
                const passwordMatch = await bcrypt.compare(password, user.password);
                console.log("PasswordMatch Result:", passwordMatch);
                if(passwordMatch){
                    req.session.userEmail = email;
                    let projects  = await getProjects();
                    res.render('projects',{projects:projects,userEmail:req.session.userEmail});
                }else{
                    throw new Error('Invalid Credentials');
                }

            }
        }catch(error){
            res.render('login',{errorMessage:error.message});
        }
    }
    logOut(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect("/login")
            }
        })
        res.clearCookie('lastVisit');
    }
}