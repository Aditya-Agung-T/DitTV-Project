# DitTV Project

DitTV adalah aplikasi web yang memungkinkan pengguna untuk menelusuri dan menemukan film dan acara TV. Aplikasi ini menggunakan The Movie Database (TMDB) API untuk mengambil data.

## Fitur

-   Telusuri film dan acara TV populer, berperingkat teratas, dan yang akan datang.
-   Lihat detail untuk setiap film atau acara TV, termasuk ringkasan, rating, dan lainnya.
-   Cari film dan acara TV berdasarkan judul.
-   Desain responsif yang berfungsi di perangkat seluler dan desktop.

## API

Aplikasi ini menggunakan [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) untuk mengambil semua data film dan acara TV. Anda memerlukan kunci API dari TMDB untuk menjalankan aplikasi ini.

## Memulai

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

### Backend

1.  Buka direktori `backend`.
2.  Install dependensi:
    ```sh
    npm install
    ```
3.  Buat file `.env` di direktori `backend` dan tambahkan kunci API TMDB Anda:
    ```
    TMDB_API_KEY=kunci_api_anda
    ```
4.  Mulai server:
    ```sh
    npm start
    ```

### Frontend

1.  Buka direktori `frontend`.
2.  Install dependensi:
    ```sh
    npm install
    ```
3.  Mulai aplikasi:
    ```sh
    npm run dev
    ```

## Tech Stack

### Backend

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [Axios](https://axios-http.com/)
-   [Cors](https://www.npmjs.com/package/cors)
-   [Dotenv](https://www.npmjs.com/package/dotenv)

### Frontend

-   [React](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [React Router](https://reactrouter.com/)
-   [Swiper](https://swiperjs.com/)

