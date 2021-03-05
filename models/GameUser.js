const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const LeaderBoard=new Schema({
    total_coin:{
        type:Number,
        default:0
    },
    last_week_total_coin:{
        type:Number,
        default:0
    },
    user_game_level:{
        type:Number,
        default:0
    },
    user_xp:{
        type:Number,
        default:0
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
    friends:[Friends],
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
    job_schedule_id:{
        type:String
    },
    leaderBoard:LeaderBoard
},{
    timestamps: true
});

module.exports=mongoose.model("GameUser",gameUsersSchema);