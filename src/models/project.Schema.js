import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    pName:{type:String,
        required:[true,"Project Name is required"],
        maxLength: [50, "Projectname can't exceed 50 characters"],
        minLength: [2, "name should have atleast 2 charcters"],
    },
    description:{type:String,
        required:[true,"Description is required"],
        minLength: [10, "Description should have atleast  10 characters"]
    },
    author:{
        type:String,
        required: [true, "Author name is requires"],
        maxLength: [30, "Author name can't exceed 30 characters"],
        minLength: [2, "Author name  should have atleast 2 charcters"],
    }
});

export const ProjectModel = mongoose.model("Project",ProjectSchema);