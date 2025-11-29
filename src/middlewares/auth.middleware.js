const { verifyAccessToken } = require("../utils/jwt");

function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  // 1. Memeriksa Header Authorization
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Missing or invalid Authorization header",
      cid: req.correlationId,
    });
  }

  // 2. Mengekstrak Token
  const token = header.replace("Bearer ", "").trim();

  // 3. Memverifikasi Token
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // {id, role, email}
    next();
  } catch (err) {
    // Menangani error jika token tidak valid atau kedaluwarsa
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      cid: req.correlationId,
    });
  }
}

module.exports = verifyToken;