import { UserModel } from "./user.schema.js";

export const addUser = async(data)=>{
    try {
        const {name,email,password} = data;
        //Validate Password Length
        if (password.length < 8 || password.length > 16) {
            throw new Error('Error: Password:  Password must be between 8 and 16 characters long');
          }
        //   Check if User Already Exists
        const checkUser = await UserModel.exists({email});
        if(checkUser){
            throw new Error('Error: Email: This User Already Exists Continue to Login');
        }
        
    
        await new UserModel({name,email,password}).save();
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}
export const getUser = async()=>{
    return await UserModel.find({});
}

export const checkUser = async (email)=>{
    try {
        const user = await UserModel.findOne({ email });
        return user;
      } catch (error) {
        console.log(error);
        throw new Error("Invalid Credentials");
      }
}
