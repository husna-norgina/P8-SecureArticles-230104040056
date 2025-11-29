const Article = require("../repositories/articles.repo");

// --- MENDAPATKAN SEMUA ARTIKEL (dengan Pagination, Filter, Sort) ---
async function getAllArticles(query) {
  // (tetap seperti Langkah 3)
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  // Membuat Filter MongoDB
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.tag) filter.tags = query.tag;
  if (query.q) {
    filter.$or = [
      { title: { $regex: query.q, $options: "i" } },
      { content: { $regex: query.q, $options: "i" } },
    ];
  }

  // Menentukan Sortir
  const sortBy = query.sortBy || "createdAt";
  const order = query.order === "asc" ? 1 : -1;

  // Menjalankan Query
  const results = await Article.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: order });

  const total = await Article.countDocuments(filter);

  return { page, limit, total, results };
}

// --- MEMBUAT ARTIKEL BARU ---
async function createArticle(data, user) {
  const article = new Article({
    ...data,
    author: user.email,  // set author otomatis dari JWT
    authorId: user.id,  // untuk ownership check (kita simpan)
  });
  return await article.save();
}

// --- MEMPERBARUI ARTIKEL ---
async function updateArticle(id, data, user) {
  const article = await Article.findById(id);
  if (!article) return null;

  // Melakukan Pengecekan Otorisasi (OWNER atau ADMIN)
  const isOwner = article.authorId === user.id;
  const isAdmin = user.role === "admin";
  
  // Jika BUKAN Owner DAN BUKAN Admin, tolak akses (403 Forbidden)
  if (!isOwner && !isAdmin) {
    const err = new Error("Forbidden: not owner");
    err.statusCode = 403;
    throw err;
  }

  Object.assign(article, data);
  return await article.save();
}

// --- MENGHAPUS ARTIKEL ---
async function deleteArticle(id) {
  return await Article.findByIdAndDelete(id);
}

module.exports = { getAllArticles, createArticle, updateArticle, deleteArticle };