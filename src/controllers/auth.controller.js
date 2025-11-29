const AuthService = require("../services/auth.service");
const { ok, created } = require("../utils/response");

// --- REGISTER (Handler untuk mendaftar pengguna) ---
async function register(req, res, next) {
  try {
    const user = await AuthService.register(req.body);
    return created(res, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      "Registered"
    );
  } catch (err) {
    next(err);
  }
}

// --- LOGIN (Handler untuk masuk pengguna) ---
async function login(req, res, next) {
  try {
    const { user, accessToken, refreshToken } = await AuthService.login(req.body);
    return ok(res, {
        accessToken,
        refreshToken,
        user: { 
            id: user._id, 
            name: user.name, 
            email: user.email, 
            role: user.role 
        },
      },
      "Logged in"
    );
  } catch (err) {
    next(err);
  }
}

// --- REFRESH (Handler untuk memperbarui token) ---
async function refresh(req, res, next) {
  try {
    const tokens = await AuthService.refresh(req.body.refreshToken);
    return ok(res, tokens, "Token refreshed");
  } catch (err) {
    next(err);
  }
}

// --- LOGOUT (Handler untuk keluar pengguna) ---
async function logout(req, res, next) {
  try {
    await AuthService.logout(req.user.id);
    return ok(res, null, "Logged out");
  } catch (err) {
    next(err);
  }
}

// --- ME (Handler untuk mendapatkan data pengguna saat ini) ---
async function me(req, res, next) {
  try {
    const user = await AuthService.me(req.user.id);
    return ok(res, user);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, refresh, logout, me };