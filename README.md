# Job Vacancy

Ini adalah proyek study case Backend Developer dari PT Panorama JBT menggunakan framework Laravel versi 11 yang memerlukan beberapa langkah untuk setup lingkungan pengembangan lokal. Ikuti langkah-langkah di bawah ini untuk menginstal dependensi dan menjalankan aplikasi.

## Fitur

Sistem ini memiliki beberapa fitur:
- Admin harus login (menggunakan email & password) untuk mengelola dada jobs dan applications
- Saat user apply lowongan yang tersedia, sistem akan secara otomatis mengirim notifikasi pemberitahuan melalui email (sesuaikan konfigurasi email di file `.env`)
- Autentifikasi API user login menggunakan token (laravel sanctum)

## Persyaratan Sistem

Pastikan Anda memiliki persyaratan berikut sebelum memulai:

- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL

## Langkah Instalasi

### 1. Clone Reposity
Clone repository ke direktori lokal Anda menggunakan perintah berikut:
```bash
    https://github.com/hawary-id/jobVacancy.git
```    

### 2. Masuk Direktori Proyek
```bash
    cd jobVacancy
```

### 3. Install Dependencies
```bash
    composer install
```

### 4. Salin File `.env`
```bash
    cp .env.example .env
```

### 5. Generat Application Key
```bash
    php artisan key:generate
```

### 6. Konfigurasi Cache
```bash
    php artisan config:cache
```

### 7. Migrasi Database & Seeder
```bash
    php artisan migrate:fresh --seed
```

### 8. Install Frontend Dependencies
```bash
    npm install
```

### 9. Build Assets
- Untuk Pengembangan:
```bash
    npm run dev
```
- Untuk Produksi:
```bash
    npm run build
```

### 10. Menjalankan Applikasi
```bash
    php artisan serve
```

## License

Proyek ini dilisensikan di bawah [MIT license](https://opensource.org/licenses/MIT).
