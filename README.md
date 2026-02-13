# 🧩 Kanban Board

A simplified **Kanban Board Application** built with focus on ⚡ Optimistic UI updates, 🧠 robust state management, and 🎨 clean user experience.
> 🛠️ Built using React + Tailwind CSS  

---

## 📌 Objective

The goal of this project is not just to build a working Kanban board, but to demonstrate:

- ⚡ Optimistic UI updates  
- 🔁 Proper rollback handling  
- ⏳ Asynchronous state consistency  
- 🧠 Clean application architecture  
- 🎨 Minimal & responsive UI  

---

# 🌐 Live Demo

🔗 **Live Hosted Link:** https://kanban-i4vg.vercel.app/

---

# 🛠️ Tech Stack

- ⚛️ React.js  
- 🎨 Tailwind CSS  
- 🧠 State Management: Context API
- 📦 JavaScript / TypeScript  
- 🌍 Deployment: Vercel 

---

# ✨ Features

## 🔐 1. Landing Page & Mock Authentication

- Clean landing page with Login button  
- Accepts any non-empty username/email  
- Redirects to Kanban board on success  
- 💾 Login state persists on refresh (localStorage)

---

## 📋 2. Kanban Board

### Three Columns:

- 📝 To Do  
- 🚧 In Progress  
- ✅ Done  

### Functionalities

- ➕ Add Task (to "To Do")  
- 🔄 Move Task (Drag & Drop)  
- ❌ Delete Task  

---

# 🔁 Failure Handling & Rollback Logic

If API fails (after delay):

1. 🔔 Show Toast Notification  
   Example:  
   `"Failed to move item. Please try again."`

2. 🔄 Automatic Rollback  
   - Previous state is restored  
   - Card moves back to original column  
   - UI remains consistent  

---

# 🧪 How to Run Locally

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Himanshu-Joshi45/Kanban.git

# 2️⃣ Navigate into project
cd frontend

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start development server
npm run dev

---

```
## 👨‍💻 Developer

Himanshu Joshi
- [GitHub](https://github.com/Himanshu-Joshi45)



