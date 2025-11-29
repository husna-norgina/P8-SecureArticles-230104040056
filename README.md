# 🌐 Praktikum #8 — Web Service Engineering

Menerapkan **Secure & Observable RESTful CRUD API** pada Express.js dengan arsitektur modular dan praktik industrial backend modern.
Project ini mencakup implementasi **JWT Authentication**, **Refresh Token**, **RBAC**, **Security Hardening**, serta **Observability (Logging, Correlation ID, Health Check)**.

**Topik:** Secure & Observable RESTful API (Authentication, Authorization, Security, Observability)

---

## 🧑‍🎓 Informasi Mahasiswa

| Informasi         | Data                                      |
| ----------------- | ----------------------------------------- |
| Mata Kuliah       | Web Service Engineering                   |
| Dosen Pengampu    | Muhayat, M.IT                             |
| Praktikum         | P8 - Secure & Observable RESTful CRUD API |
| Nama Mahasiswa    | Husna Norgina                             |
| NIM               | 230104040056                              |
| Kelas             | TI23B                                     |
| Tanggal Praktikum | 24-11-2025                                |

---

## 🎯 Tujuan Praktikum

1. Merancang API CRUD sesuai 7 RESTful Principles secara konsisten (resource, method,
   status code, HATEOAS ringan, stateless, caching, layered system).
2. Mengimplementasikan JWT Authentication (register/login/refresh/logout) dengan
   keamanan standar industri.
3. Menerapkan role-based authorization (admin vs user).
4. Melakukan hardening API: validation, rate limit, security headers, CORS, error
   hygiene, env secrets, dsb.
5. Membangun observability: structured logging + correlation-id + health/metrics
   endpoint.
6. Menyusun dokumentasi OpenAPI yang akurat, test-ready, dan bisa dipakai integrasi
   lintas layanan.

---

## 🛠 Tools & Environment

### **Wajib:**

* Node.js 18+ / 20 LTS  
* Express.js  
* MongoDB / PostgreSQL (pilih salah satu)  
* JWT library (jsonwebtoken)  
* bcrypt  
* Joi / Zod / Express-validator (validation)  
* Jest + Supertest  
* OpenAPI + Spectral  
* Postman / Insomnia  
* GitHub Actions  

### **Observability / Hardening (Advance Layer):**

* pino / winston (structured logger)  
* express-rate-limit  
* helmet  
* cors  
* morgan → diganti structured log  
* uuid / nanoid (correlation-id)  
* swagger-ui-express (docs)  
* optional: prom-client (metrics)  

---

## ⚙️ Struktur Project

```
src/
├─ app.js
├─ server.js
├─ config/
│   ├─ env.js
│   └─ db.js
├─ controllers/
│   ├─ auth.controller.js
|   ├─ articles.controller.js
│   └─ system.controller.js
├─ services/
│   ├─ auth.service.js
│   └─ articles.service.js
├─ repositories/
│   ├─ users.repo.js
│   └─ articles.repo.js
├─ routes/
│   ├─ articles.routes.js
|   ├─ auth.routes.js
│   └─ system.routes.js
├─ middlewares/
│   ├─ auth.middleware.js
│   ├─ role.middleware.js
│   ├─ correlationId.middleware.js
│   ├─ rateLimit.middleware.js
│   ├─ validate.middleware.js
│   ├─ error.middleware.js
│   └─ notFound.middleware.js
├─ utils/
│   ├─ logger.js
│   ├─ response.js
│   ├─ jwt.js
│   ├─ auth.validation.js
│   ├─ articles.validation.js
│   └─ articles.dto.js
└─ docs/
    └─ openapi.yaml
```

---

## 🔐 Autentikasi & Autorisasi

### **JWT Authentication**

Menggunakan:

* **Access Token** (kadaluarsa cepat)
* **Refresh Token** (disimpan di DB, bisa dicabut)

### **RBAC (Role-Based Access Control)**

* **user** → hanya bisa mengelola artikelnya
* **admin** → full access seluruh artikel

---

## 🧩 Daftar Endpoint

### 🛡️ **AUTH ENDPOINTS**

| Method | Endpoint           | Auth         | Deskripsi                                 |
| ------ | ------------------ | ------------ | ----------------------------------------- |
| POST   | /api/auth/register | Public       | Register user baru (role: user/admin)     |
| POST   | /api/auth/login    | Public       | Login → dapat accessToken + refreshToken  |
| POST   | /api/auth/refresh  | Public       | Meminta accessToken baru via refreshToken |
| POST   | /api/auth/logout   | Access Token | Logout & invalidate refreshToken          |
| GET    | /api/auth/me       | Access Token | Mengambil profil user dari JWT            |

---

### 📰 **ARTICLES ENDPOINTS (CRUD + RBAC)**

| Method | Endpoint          | Auth         | Role        | Deskripsi                                 |
| ------ | ----------------- | ------------ | ----------- | ----------------------------------------- |
| GET    | /api/articles     | Public       | public      | List all articles + pagination + search   |
| POST   | /api/articles     | Access Token | user/admin  | Create article (author otomatis dari JWT) |
| PUT    | /api/articles/:id | Access Token | owner/admin | Update artikel                            |
| DELETE | /api/articles/:id | Access Token | admin       | Hapus artikel                             |

---

### ⚙️ **SYSTEM & OBSERVABILITY ENDPOINTS**

| Method | Endpoint | Auth   | Deskripsi             |
| ------ | -------- | ------ | --------------------- |
| GET    | /health  | Public | Cek status server     |
| GET    | /docs    | Public | Swagger UI (API Docs) |

> Semua hasil uji Postman disimpan di folder: `./evidence/`

---

## 🔒 Security Hardening

Fitur keamanan yang diterapkan pada API:

* ✓ Helmet security headers
* ✓ CORS whitelist domain
* ✓ Rate limiting (terutama pada /auth/login)
* ✓ Body validation menggunakan Joi
* ✓ Sanitasi input dasar
* ✓ Password hashing (bcrypt)
* ✓ Tidak menampilkan pesan error internal ke client

---

## 📊 Observability

### 1. **Structured Logging (Pino)**

Merekam informasi seperti:

* method, path, status code
* duration
* userId (jika login)
* correlationId

### 2. **Correlation ID**

Setiap request diberi header otomatis:

```
x-correlation-id: <uuid>
```

### 3. **Health Check**

```
GET /health
```

Merespons status layanan, uptime, timestamp.

### 4. **API Docs (Swagger UI)**

```
GET /docs
```

Dokumentasi berdasarkan OpenAPI 3.1.

---

## 📊 Analisis

* API sudah memenuhi standar security modern.
* Penggunaan JWT + refresh meningkatkan keamanan autentikasi.
* Struktur modular memudahkan maintain dan scaling.
* Logging + correlation-id memudahkan debugging dan tracing.
* Dokumentasi OpenAPI membuat API mudah diintegrasikan.
* Validasi input mencegah request berbahaya.

---

## ✅ Kesimpulan

Praktikum 8 berhasil mengimplementasikan API yang **aman, terstruktur, observable, dan sesuai standar industri**. Seluruh fitur autentikasi, autorisasi, security, CRUD articles, validasi, dan dokumentasi berjalan dengan baik.

---

## 📌 Checklist Praktikum

* ✅ JWT Authentication
* ✅ Refresh Token + revoke
* ✅ RBAC (user/admin)
* ✅ CRUD Articles
* ✅ Helmet + CORS whitelist
* ✅ Rate limiting
* ✅ Request logging (Pino)
* ✅ Correlation ID
* ✅ Health check
* ✅ Dokumentasi OpenAPI
* ✅ Evidence Postman lengkap
* ✅ Dokumentasi README.md selesai

---