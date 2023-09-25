import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
      type: String,
      required : [true,"First name is required"]
    },
    lastName : {
        type: String,
        required : [true,"Last name is required"]
      },
    email : {
        type: String,
        required : [true,"Email is required"],
        unique : true
      },
    password : {
        type: String,
        required : [true,"password is required!"],
        minlength :[6,"password length should be greater than 6 characters."],
        select : true
    },
    location : {type:String},
    profileUrl : {type:String},
    profession : {type:String},
    friends : [{type: Schema.Types.ObjectId,ref:"Users"}],
    views : [{type:String}],
    verified : {type:Boolean,default:false},
},
{timestamps:true}
);

const Users = mongoose.model("Users",userSchema);

export default Users;