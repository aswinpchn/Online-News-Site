import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  articleId: {
    type: Number,
    required: true
  },
  editorId: {
    type: Number,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  editorName: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  likeCount: {
    type: Number,
    required: true,
    default: 0
  },
  readCount: {
    type: Number,
    required: true,
    default: 0
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
    type: Number,
    required: true,
    default: 0
  }
});

export default mongoose.model('Article', schema);