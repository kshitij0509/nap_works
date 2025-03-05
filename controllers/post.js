const Post = require("../models/postModel");
exports.postContent = async (req, res) => {
  try {
    const { postName, description, tags, imageUrl } = req.body;
    const docToBeSaved = {
      userId: req.user.userId,
      postName,
      description,
      tags,
      imageUrl,
    };
    const newPost = new Post(docToBeSaved);
    await newPost.save();
    return res.send({ success: true, data: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    let {
      searchText,
      startDate,
      endDate,
      tags,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (searchText) {
      query.$or = [
        { postName: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ];
    }

    if (startDate || endDate) {
      query.uploadTime = {};
      if (startDate) query.uploadTime.$gte = new Date(startDate);
      if (endDate) query.uploadTime.$lte = new Date(endDate);
    }

    if (tags) {
      if (typeof tags === "string") {
        tags = [tags]; // Convert single string to array
      }
      query.tags = { $in: tags };
    }

    // Pagination
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    // Fetch posts from MongoDB
    console.log(JSON.stringify(query, null, 1));

    const posts = await Post.find(query).skip(skip).limit(limit);
    const totalPosts = await Post.countDocuments(query);

    res.json({
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
