const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/user");
const { postContent, getPosts } = require("../controllers/post.js");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest.js");
const postValidateRequest = require("../middleware/postValidation.js");
const {
  loginSchema,
  signupSchema,
} = require("../middleware/authValidation.js");

router.post("/api/signup", validateRequest(signupSchema), signup);

router.post("/api/login", validateRequest(loginSchema), login);

router.use(authMiddleware);

router.post("/api/posts", postValidateRequest(postSchema), postContent);

router.get("/api/posts", getPosts);

module.exports = router;
