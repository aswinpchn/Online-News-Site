import mongoose from 'mongoose';
import Comment from './comment'

const schema = new mongoose.Schema({
  articleId: {
    type: Number,
    required: true
  },
  editorId: {
    type: Number,
    required: true
  },
  likeCount: {
    type: Number
  },
  readCount: {
    type: Number
  },
  comments: [{
    userId: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    commentTime: {
      type: Date,
      required: true
    }
  }],
  commentCount: {
    type: Number
  }
});

export default mongoose.model('Article', schema);