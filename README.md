
# 🩺 Medify — Health & Wellness Management System

**Medify** is a full-stack CRUD web app that helps **patients** manage their health in one place.  
It combines a **doctor directory**, a **medication tracker**, and an **appointment booking system** to make healthcare simple and organized.

---

## ✨ What it does

### 🔑 Authentication
- Signup/login with full name and password  
- Personalized greeting after login (“Hi, user”)  
- Secure logout functionality  

### 👨‍⚕️ Doctors
- Static directory of doctors with names, photos, and specialties  
- Example specialties: Pediatrics, Neurology, ENT, Orthopedics, Dermatology, Cardiology  

### 📅 Appointments (CRUD)
- Book 30-minute slots with doctors (no double booking)  
- Select doctor, date, time, and add notes  
- View upcoming appointments with doctor details  
- Edit or cancel appointments  

### 💊 Medications (CRUD)
- Add medications with name, dosage, and frequency (times/day)  
- Choose timing options (morning, evening, before/after food, before bed)  
- Add notes for reminders  
- Edit or delete medications  

---

## 🧩 Core Features

- **Auth** — secure signup, login, and logout  
- **Doctors Directory** — static list of doctors with photos and specialties  
- **Appointments** — CRUD for booking, editing, and canceling visits  
- **Medications** — CRUD for adding, editing, and deleting medications  

---

## 🛠️ Technologies

- **Node.js + Express** — backend server and routing  
- **MongoDB + Mongoose** — database and schemas  
- **EJS + express-ejs-layouts** — server-rendered views with shared layouts  
- **CSS** — custom responsive styling  
- **method-override, morgan, dotenv** — Express utilities  
- **Sessions + Middleware** — for authentication  

> Architecture: built with **MVC** pattern (`models/`, `controllers/`, `routes/`, `views/`) for clarity and scalability.

---

## 📌 Summary

Medify is a portfolio-ready CRUD project for healthcare management:  
- Browse doctors  
- Book and manage appointments  
- Track medications  

All in one organized, patient-first web app.  
