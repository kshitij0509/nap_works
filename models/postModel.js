const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postName: { type: String, required: true },
    description: { type: String, required: true },
    uploadTime: { type: Date, default: Date.now },
    tags: [String],
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
