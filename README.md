# ⚡ Nexus E-Commerce Platform

A modern, full-featured e-commerce web application built with React, TypeScript, and Tailwind CSS — featuring role-based access control, dynamic product browsing, admin analytics, secure login, and responsive design.  

> 🚀 Nexus isn't just a store. It's a platform. It's *all things, one place.*

---

## ✨ Features

### 🛒 For Customers
- Browse and filter a variety of electronics products
- Add/remove items to Cart or Wishlist (localStorage powered)
- Product search with responsive UI
- Smooth checkout flow (secured via AuthGuard)
- View your account with login details
- Continue shopping seamlessly after login

### 🛡️ For Admins
- Dedicated admin dashboard with tabs: **Orders**, **Products**, **Customers**, **Analytics**
- View user purchases, order statuses, product stock
- Admin-only route access (via `AuthGuard`)
- Protected by role-based auth (admin flag)

---

## 🔐 Authentication & Access Control

- Custom authentication using localStorage (`user`, `token`)
- Role-check logic baked into `AuthGuard.tsx`
- Admin panel is protected and only visible to admin users
- Reusable Account page shows:
  - User Email
  - Logout
  - Continue Shopping
  - *(For admins only)*: "Go to Admin Page" button

---

## 🧱 Tech Stack

| Layer        | Tech Used                          |
|-------------|------------------------------------|
| **Frontend**| React, TypeScript, Tailwind CSS    |
| **Routing** | React Router DOM                   |
| **State**   | useState, useEffect, localStorage  |
| **UI/UX**   | Lucide Icons, ShadCN UI, Sonner    |
| **Access**  | Custom AuthGuard component         |
| **Data**    | Static product + user data (JSON)  |

---

## 🧠 What Makes Nexus Special?

- ✅ **Role-Based Routing:** Not just protected, but smart.
- ✅ **Dynamic UI:** Buttons, routes, and visibility depend on who you are.
- ✅ **Offline-First:** Everything backed by `localStorage` — no backend needed.
- ✅ **Admin UX:** Your data, your control. In tabs. In style.

---

## 🚧 Future Improvements

- [ ] Payment gateway (Stripe/Razorpay)
- [ ] Product upload for admins
- [ ] Order history for users
- [ ] Persistent cart/wishlist across devices

---

## 💥 Live Demo

🚀 [NEXUS-ECOM-HUB](https://nexus-ecom-hub.vercel.app/)  
> Hosted on Vercel | Blazing fast | Always online

<a href="https://nexus-ecom-hub.vercel.app/" target="_blank">
  <img src="https://nexus-ecom.vercel.app/image-uploads/4ed668f5-7f34-4be0-8e74-391cc406acfe.png" 
       alt="Nexus brand image" 
       width="220" />
</a>

> Click the logo above to explore the live site ✨

---

## 👨‍💻 Author

Built with 🔥 by **Selcii**  
_Data Science + AI undergrad | Passionate about frontend, secure systems & digital products._

> _"Design like Apple. Code like Google. Secure like AWS."_

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to use, fork, and level up your e-commerce game.

---