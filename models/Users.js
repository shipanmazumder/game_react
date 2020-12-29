const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const usersSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    email_verified_at:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    remember_token:{
        type:String
    }
},{
    timestamps: true
});
usersSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }
module.exports=mongoose.model("Users",usersSchema);