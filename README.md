# 🌐 Praktikum 8 — Secure & Observable RESTful API (Express.js)

Praktikum ini membahas **pengembangan RESTful API yang aman dan terobservasi** menggunakan **Node.js dan Express.js**. API menerapkan **JWT Authentication**, **Refresh Token**, **Role-Based Access Control (RBAC)**, **CRUD Articles**, **Security Hardening**, serta **Observability** melalui logging, health check, dan dokumentasi Swagger.

**Topik:** Secure & Observable RESTful API (Authentication, Authorization, Security, Observability)

---

## 🧑‍🎓 Informasi Mahasiswa

| Informasi          | Data                                                             |
|--------------------|------------------------------------------------------------------|
| Mata Kuliah        | Web Service Engineering                                          |
| Dosen Pengampu     | Muhayat, M.IT                                                    |
| Praktikum / Proyek | P8 – Secure & Observable RESTful CRUD API                        |
| Nama Mahasiswa     | Husna Norgina                                                    |
| NIM                | 230104040056                                                     |
| Kelas              | TI23B                                                            |
| Repo GitHub        | https://github.com/husna-norgina/P8-SecureArticles-230104040056  |
| Tanggal Praktikum  | 24-11-2025                                                       |                                                                                 
---

## 🎯 Tujuan Praktikum

1. Menerapkan **JWT Authentication** (register, login, refresh, logout).
2. Mengimplementasikan **Role-Based Access Control (RBAC)**.
3. Membangun **CRUD Articles** sesuai prinsip RESTful.
4. Menerapkan **security hardening** (Helmet, CORS, Rate Limit).
5. Menyediakan **observability endpoint** (health & docs).
6. Menyusun dokumentasi API yang rapi dan mudah diuji.

---

## 🛠 Tools & Environment

* Node.js 18+
* Express.js
* JSON Web Token (JWT)
* bcrypt
* Helmet
* CORS
* express-rate-limit
* dotenv
* Postman
* Swagger UI
* Git & GitHub

---

## 🧱 Arsitektur Sistem

**Alur Sistem:**

* Client (Postman / Browser)
* API Server (Express.js)
* Authentication & Authorization Middleware
* Articles Controller
* Data sementara (in-memory / database)
* Response JSON ke client

Arsitektur menggunakan pola **Client–Server** dengan struktur modular.

---

## 🔁 Pengujian & Implementasi API

---

### 🔵 1. POST — Register User

| Method | Endpoint             | Keterangan         |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/register` | Register user baru |

**Hasil:**

![Register User](evidence/1.%20post%20auth-register.png)

User berhasil didaftarkan.
Server merespons status `201 Created`.

---

### 🔵 2. POST — Login User

| Method | Endpoint          | Keterangan |
| ------ | ----------------- | ---------- |
| POST   | `/api/auth/login` | Login user |

**Hasil:**

![Login User](evidence/2.%20post%20auth-login.png)

Login berhasil dan menghasilkan access token.
Server merespons status `200 OK`.

---

### 🔵 3. POST — Refresh Token

| Method | Endpoint            | Keterangan           |
| ------ | ------------------- | -------------------- |
| POST   | `/api/auth/refresh` | Refresh access token |

**Hasil:**

![Refresh Token](evidence/3.%20post%20auth-refresh.png)

Token berhasil diperbarui.
Server merespons status `200 OK`.

---

### 🔵 4. POST — Logout

| Method | Endpoint           | Keterangan  |
| ------ | ------------------ | ----------- |
| POST   | `/api/auth/logout` | Logout user |

**Hasil:**

![Logout](evidence/4.%20post%20auth-logout.png)

User berhasil logout.
Server merespons status `200 OK`.

---

### 🔵 5. GET — Profil User (JWT)

| Method | Endpoint       | Keterangan            |
| ------ | -------------- | --------------------- |
| GET    | `/api/auth/me` | Ambil data user login |

**Hasil:**

![Auth Me](evidence/5.%20get%20auth-me.png)

Profil user ditampilkan dari token JWT.
Server merespons status `200 OK`.

---

### 🔵 6. GET — Ambil Semua Articles

| Method | Endpoint        | Keterangan         |
| ------ | --------------- | ------------------ |
| GET    | `/api/articles` | List semua artikel |

**Hasil:**

![Get Articles](evidence/6.%20get%20articles.png)

Menampilkan daftar artikel.
Server merespons status `200 OK`.

---

### 🔵 7. POST — Tambah Article

| Method | Endpoint        | Keterangan     |
| ------ | --------------- | -------------- |
| POST   | `/api/articles` | Tambah artikel |

**Hasil:**

![Post Articles](evidence/7.%20post%20articles.png)

Artikel berhasil ditambahkan.
Server merespons status `201 Created`.

---

### 🔵 8. POST — Register Admin

| Method | Endpoint             | Keterangan     |
| ------ | -------------------- | -------------- |
| POST   | `/api/auth/register` | Register admin |

**Hasil:**

![Register Admin](evidence/8.%20post%20register-admin.png)

Admin berhasil didaftarkan.
Server merespons status `201 Created`.

---

### 🔵 9. POST — Login Admin

| Method | Endpoint          | Keterangan  |
| ------ | ----------------- | ----------- |
| POST   | `/api/auth/login` | Login admin |

**Hasil:**

![Login Admin](evidence/9.%20post%20login-admin.png)

Login admin berhasil.
Server merespons status `200 OK`.

---

### 🔵 10. PUT — Update Article

| Method | Endpoint             | Keterangan     |
| ------ | -------------------- | -------------- |
| PUT    | `/api/articles/{id}` | Update artikel |

**Hasil:**

![Update Article](evidence/10.%20put%20articles-id.png)

Artikel berhasil diperbarui.
Server merespons status `200 OK`.

---

### 🔵 11. DELETE — Hapus Article

| Method | Endpoint             | Keterangan    |
| ------ | -------------------- | ------------- |
| DELETE | `/api/articles/{id}` | Hapus artikel |

**Hasil:**

![Delete Article](evidence/11.%20delete%20articles-id.png)

Artikel berhasil dihapus.
Server merespons status `204 No Content`.

---

### 🔵 12. GET — Health Check

| Method | Endpoint  | Keterangan     |
| ------ | --------- | -------------- |
| GET    | `/health` | Cek status API |

**Hasil:**

![Health](evidence/12.%20get%20health.png)

API berjalan normal.
Server merespons status `200 OK`.

---

### 🔵 13. GET — API Docs (JSON)

| Method | Endpoint | Keterangan   |
| ------ | -------- | ------------ |
| GET    | `/docs`  | OpenAPI JSON |

**Hasil:**

![Docs](evidence/13.%20get%20docs.png)

Dokumentasi API tersedia.
Server merespons status `200 OK`.

---

### 🔵 14. Swagger UI (Browser)

**Hasil:**

![Swagger UI](evidence/14.%20swagger%20UI_browser.png)

Swagger UI menampilkan dokumentasi API secara interaktif.

---

## 📄 Laporan Praktikum 8

[230104040056_Husna Norgina_P8.pdf](<evidence/230104040056_Husna Norgina_P8.pdf>)

---

> Semua screenshot hasil uji endpoint dan laporan praktikum disimpan pada folder:
> 📂 `./evidence/`

---

## 📊 Analisis Praktikum

* JWT Authentication dan Refresh Token berjalan dengan baik.
* RBAC membatasi akses user dan admin.
* CRUD Articles sesuai prinsip RESTful.
* Middleware keamanan meningkatkan perlindungan API.
* Observability membantu monitoring dan debugging.
* Dokumentasi Swagger memudahkan pengujian API.

---

## ✅ Kesimpulan

Berdasarkan praktikum yang telah dilakukan, dapat disimpulkan bahwa RESTful API berhasil diimplementasikan dengan fitur keamanan dan observability. Seluruh endpoint authentication, CRUD articles, dan system monitoring berjalan dengan baik dan sesuai konsep REST API. Praktikum ini memberikan pemahaman lanjutan mengenai pengembangan API yang aman, terstruktur, dan terdokumentasi.

---

## 📌 Catatan

* Pengujian dilakukan menggunakan Postman.
* Autentikasi menggunakan JWT.
* API dikembangkan untuk keperluan pembelajaran.

---

📝 *Disusun oleh Husna Norgina (230104040056) — Praktikum 8 Web Service Engineering*
