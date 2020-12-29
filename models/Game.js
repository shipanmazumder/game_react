const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const BotMessages=new Schema({
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String
    },
    image_url:{
        type:String,
        required:true
    },
    message_time:{
        type:String,
        required:true
    },
    button_title:{
        type:String
    },
    data:{
        type:String,
        required:true
    },
    position:{
        type:Number
    },
    status:{
        type:Boolean,
        default:false
    },
});

const gameSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    game_short_code:{
        type:String,
        required:true
    },
    app_id:{
        type:Number,
        required:true
    },
    app_secret:{
        type:String,
        required:true
    },
    game_unique_id:{
        type:String,
        required:true
    },
    game_access_token:{
        type:String,
        required:true
    },
    game_verify_token:{
        type:String,
        required:true
    }, 
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    botMessages:[BotMessages],
    description:{
        type:String
    }, 
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps: true
});

module.exports=mongoose.model("Game",gameSchema);