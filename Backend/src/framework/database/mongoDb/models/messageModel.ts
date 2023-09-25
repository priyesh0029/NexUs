import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  content : {type :String,trim:true},
  chatId: { type: Schema.Types.ObjectId, ref: "Chat" }
},
{ timestamps: true }
);


const Message = model('Message',messageSchema)

export default Message