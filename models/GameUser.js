const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const LeaderBoard=new Schema({
    score:{
        type:Number
    },
    user_game_level:{
        type:Number
    },
    user_xp:{
        type:Number
    },
    last_update_time:{
        type:Date
    }
});
const Friends=new Schema({
    game_user_id:{
        type:Schema.Types.ObjectId,
        ref:"GameUser"
    }
});
const gameUsersSchema=new Schema({
    game_id:{
        type:Schema.Types.ObjectId,
        ref:"Game",
        index: true
    },
    firends:[Friends],
    name:{
        type:String
    },
    user_unique_id:{
        type:String,
        required:true
    },
    sender_id:{
        type:String
    },
    image:{
        type:String
    },
    last_login_time:{
        type:Date
    },
    first_message_time:{
        type:Date
    },
    last_message_time:{
        type:Date
    },
    next_message_time:{
        type:Date
    },
    message_count:{
        type:Number,
        default:0
    },
    leaderBoard:LeaderBoard
},{
    timestamps: true
});

module.exports=mongoose.model("GameUser",gameUsersSchema);