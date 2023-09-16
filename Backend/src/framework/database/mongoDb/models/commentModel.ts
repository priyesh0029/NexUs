import {Schema,model} from 'mongoose';

const replySchema = new Schema({
    userName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    delete:{
      type: Boolean,
      default: false,
      required:true
    },
    reports: [{
      reportedUser : {
        type: String,
        required: true,
      },
      report : {
        type: String,
        required: true,
      }
    }],
    liked: [String], // Specify the type as an array of strings
  }, { timestamps: true });
  
  const commentSchema = new Schema({
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    delete:{
      type: Boolean,
      default: false,
      required:true
    },
    reports: [{
      reportedUser : {
        type: String,
        required: true,
      },
      report : {
        type: String,
        required: true,
      }
    }],
    liked: [String], // Specify the type as an array of strings
    reply: [replySchema],
  }, { timestamps: true });
  
  const Comment = model('Comments', commentSchema);
  
  export default Comment;