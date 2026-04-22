
<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20(Vite)-61DAFB?style=flat&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/UI-Material%20UI-007FFF?style=flat&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/Auth-Firebase-FFA611?style=flat&logo=firebase&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-Firestore-FFCA28?style=flat&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/State-Redux%20Toolkit-764ABC?style=flat&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployment-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white" />
</p>

<h1 align="center">📝 React Firebase Blog App</h1>

<p align="center">
Modern, mobile-first blog application with Firebase Auth, Firestore CRUD, likes, protected routes and responsive UI.
</p>

<div align="center">
  <h3>
    <a href="https://blog-umitdev.netlify.app/">
      🖥️ Live Demo
    </a>
     |
    <a href="https://github.com/Umit8098/React-Project-13-blog-app.git">
      📂 Repository
    </a>
  </h3>
</div>


<div align="center">
  <img src="./blog-app.gif" alt="blog-app-gif" width="800"/>
</div>


## 📚 Navigation

- [✨ Overview](#-overview)
- [📖 Description](#-description)
- [🚀 Features](#-features)
- [🗂️ Project Skeleton](#️-project-skeleton)
- [🛠️ Built With](#️-built-with)
- [⚡ How To Use](#-how-to-use)
- [🔐 Firebase Notes](#-firebase-notes)
- [📌 About This Project](#-about-this-project)
- [🙏 Acknowledgements](#-acknowledgements)
- [📬 Contact](#-contact)

---

## ✨ Overview

<div align="center">
  <img src="./blog-app-new.png" alt="blog-overview" width="800"/>
</div>

---

## 📖 Description

🔸 **React Firebase Blog App**, modern frontend stack ile geliştirilmiş bir blog uygulamasıdır.

🔸 Kullanıcılar:
- Email/Password veya Google ile giriş yapabilir
- Post oluşturabilir, düzenleyebilir ve silebilir
- Postları beğenebilir
- Profil bilgilerini (display name, photo) güncelleyebilir

🔸 Uygulama:
- Firebase Authentication ile kimlik doğrulama
- Firestore ile post verisi yönetimi
- Firebase Storage ile görsel yükleme
- Protected/Public route akışı
- Mobile-first ve responsive arayüz

🔸 Tema yönetimi:
- Dark/Light mode desteklenir
- Tema tercihi `localStorage` ile kalıcıdır

---

## 🚀 Features

- 🔐 **Firebase Authentication**
- Email / Password Login
- Google Sign-In
- 🛡️ **Protected Routes**
- Auth olmayan kullanıcılar için route guard
- 📝 **Post CRUD**
- Create / Edit / Delete post
- Optional title, required content
- ❤️ **Like System**
- Post beğenme / beğeniyi geri alma
- Yazar kendi postunu beğenemez
- 🖼️ **Image Upload**
- Post görseli Firebase Storage'a yüklenir
- Post silinince storage görseli de silinir
- 👤 **Profile Management**
- Display name ve profil foto güncelleme
- 🌗 **Theme System**
- Dark/Light mode toggle
- Theme preference persistence (`localStorage`)
- 📱 **Mobile-first Responsive UI**
- Home, PostDetail ve layout responsive
- Sticky header, desktop left sidebar
- 🚀 **Netlify Deployment**
- SPA routing için `_redirects` desteği

---

## 🗂️ Project Skeleton

```text
src/
├─ app/
│  └─ store.js
├─ components/
│  ├─ Layout.jsx
│  ├─ LeftSidebar.jsx
│  └─ Navbar.jsx
├─ features/
│  └─ auth/
│     ├─ authService.js
│     └─ authSlice.js
├─ firebase/
│  ├─ firebaseConfig.js
│  ├─ postService.js
│  ├─ storageService.js
│  └─ userService.js
├─ hooks/
│  └─ useAuthListener.js
├─ pages/
│  ├─ Home.jsx
│  ├─ PostDetail.jsx
│  ├─ CreatePost.jsx
│  ├─ EditPost.jsx
│  ├─ Profile.jsx
│  ├─ Login.jsx
│  ├─ Register.jsx
│  └─ NotFound.jsx
├─ router/
│  └─ AppRouter.jsx
├─ routes/
│  ├─ ProtectedRoute.jsx
│  └─ PublicRoute.jsx
├─ styles/
│  └─ theme.js
├─ App.jsx
└─ main.jsx
```

---

## 🛠️ Built With

- [⚛️ React (Vite)](https://react.dev/)
- [🧭 React Router](https://reactrouter.com/)
- [🧠 Redux Toolkit](https://redux-toolkit.js.org/)
- [🎨 Material UI (MUI)](https://mui.com/)
- [🔥 Firebase Authentication](https://firebase.google.com/)
- [🔥 Cloud Firestore](https://firebase.google.com/docs/firestore)
- [🔥 Firebase Storage](https://firebase.google.com/docs/storage)
- [🌐 Netlify](https://www.netlify.com/)

---

## ⚡ How To Use

```bash
# Clone repository
git clone https://github.com/Umit8098/React-Project-13-blog-app.git

# Enter project
cd React-Project-13-blog-app

# Install dependencies
yarn

# Start dev server
yarn dev
```

Then open `http://localhost:5173`.

---

## 🔐 Firebase Notes

- Google Sign-In production'da çalışması için deploy domainini Firebase'e eklemelisin:

```text
Firebase Console -> Authentication -> Settings -> Authorized domains
```

- Netlify SPA refresh sorunu için `public/_redirects`:

```text
/* /index.html 200
```

---

## 📌 About This Project

Bu proje aşağıdaki konuları gerçek bir uygulama senaryosu ile pekiştirmek amacıyla geliştirildi:

- Firebase Auth + Firestore + Storage entegrasyonu
- Protected/Public routing mimarisi
- Redux Toolkit ile auth state yönetimi
- Mobile-first ve responsive UI yaklaşımı
- Netlify deploy ve production checklist

---

## 🙏 Acknowledgements

- Clarusway
- React Documentation
- Firebase Docs
- React Router Docs
- Redux Toolkit Docs
- Material UI Docs
- Netlify Docs

---

## 📬 Contact

- GitHub: [@Umit8098](https://github.com/Umit8098)
- LinkedIn: [@umit-arat](https://linkedin.com/in/umit-arat/)
