const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");

const {
  createArticleSchema,
  updateArticleSchema,
  listArticlesSchema,
} = require("../utils/articles.validation");

const {
  listArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles.controller");

// public list
router.get("/", validate(listArticlesSchema), listArticles);

// protected create (user/admin)
router.post("/", verifyToken, requireRole("user", "admin"), validate(createArticleSchema), createArticle);

// protected update (owner/admin checked in service)
router.put("/:id", verifyToken, validate(updateArticleSchema), updateArticle);

// admin only delete
router.delete("/:id", verifyToken, requireRole("admin"), deleteArticle);

module.exports = router;