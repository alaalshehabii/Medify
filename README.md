

# 🩺 Medify – Health & Wellness Management System

**Medify** is a full-stack CRUD web app that helps **patients** manage their health in one place.  
It combines a **doctor directory**, a **medication tracker**, and an **appointment booking system** to make healthcare simple and organized.

<img width="350" height="200" alt="wireframe 6" src="https://github.com/user-attachments/assets/17f0fddf-b2cb-438b-aab9-bcd0605ed4b9" />  
<img width="350" height="200" alt="wireframe 6" src="https://github.com/user-attachments/assets/bc455b21-8ae9-42fe-953a-28449955ef6f" />  
<img width="350" height="200" alt="wireframe 6" src="https://github.com/user-attachments/assets/9b438000-c6c6-4ae6-bc4d-d73d2361472d" />  
<img width="350" height="200" alt="wireframe 6" src="https://github.com/user-attachments/assets/3a5679a2-5bfc-4b8e-803b-1b8360a0274e" />  

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

## 👥 User Stories
- **As a patient**, I want to **create an account and log in securely**, so that my data is private and only accessible to me.  
- **As a patient**, I want to **browse a list of doctors with their specialties**, so I can find the right doctor for my needs.  
- **As a patient**, I want to **book a 30-minute appointment with a doctor** and add notes, so I can explain my concerns in advance.  
- **As a patient**, I want to **view, edit, or cancel my upcoming appointments**, so I can manage my schedule easily.  
- **As a patient**, I want to **add medications with dosage and frequency**, so I can track what I need to take each day.  
- **As a patient**, I want to **set reminders for when to take my medications (before food, before bed, etc.)**, so I don’t miss important doses.  
- **As a patient**, I want to **see all my medications and appointments in one place**, so I can manage my health in an organized way.  
<img width="320" height="200" alt="Screenshot 2025-10-04 at 6 38 37 AM" src="https://github.com/user-attachments/assets/853c0385-949d-40e5-8e46-572b1ba62bbf" />
https://trello.com/invite/b/68e0949538e7c30f24d70567/ATTIb8dc458b95d867747bda6324ef64561f7EFE8D42/medify
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

---

## 📸 Wireframes Screenshots

<img width="320" height="200" alt="4924D437-605B-4074-97BC-F36921651284" src="https://github.com/user-attachments/assets/35b90f8b-ace8-4ee6-b552-284ac32518f3" />  
<img width="320" height="200" alt="444FEF9D-147D-4B93-B893-10F19D24CAD8" src="https://github.com/user-attachments/assets/d6d8fede-91cc-46c9-8cb8-ba2695694b81" />  
<img width="320" height="200" alt="182B6467-1422-4196-AC8C-8D01DF284E3D" src="https://github.com/user-attachments/assets/acc310ab-4ab8-488f-a903-7a30d5e2cb46" />  
<img width="320" height="200" alt="472C1314-DAC2-489D-BA6D-1FC3E3BD50B5" src="https://github.com/user-attachments/assets/3480ff8f-bfbb-4d1b-98a2-628be8b622f4" />  
<img width="320" height="200" alt="C759AC6E-F570-4EB3-A7CB-0F014D01ED16" src="https://github.com/user-attachments/assets/db54af48-d3dc-46ca-bab2-f44a91a51d6b" />  
<img width="320" height="200" alt="wireframe 6" src="https://github.com/user-attachments/assets/db54af48-d3dc-46ca-bab2-f44a91a51d6b" />  

## 📌 Routes & Endpoints

### 🔑 Auth
| Action   | Route        | HTTP Verb |
|----------|--------------|-----------|
| Signup   | `/signup`    | GET / POST |
| Login    | `/login`     | GET / POST |
| Logout   | `/logout`    | POST      |

---

### 👨‍⚕️ Doctors
| Action   | Route        | HTTP Verb |
|----------|--------------|-----------|
| Index    | `/doctors`   | GET       |
| Show     | `/doctors/:id` | GET     |

---

### 📅 Appointments
| Action   | Route                       | HTTP Verb |
|----------|-----------------------------|-----------|
| Index    | `/appointments`             | GET       |
| New      | `/appointments/new`         | GET       |
| Create   | `/appointments`             | POST      |
| Show     | `/appointments/:id`         | GET       |
| Edit     | `/appointments/:id/edit`    | GET       |
| Update   | `/appointments/:id`         | PUT       |
| Delete   | `/appointments/:id`         | DELETE    |

---

### 💊 Medications
| Action   | Route                         | HTTP Verb |
|----------|-------------------------------|-----------|
| Index    | `/medications`                | GET       |
| New      | `/medications/new`            | GET       |
| Create   | `/medications`                | POST      |
| Edit     | `/medications/:id/edit`       | GET       |
| Update   | `/medications/:id`            | PUT       |
| Delete   | `/medications/:id`            | DELETE    |

---

<img width="500" height="200" alt="wireframe 6" src="https://github.com/user-attachments/assets/883ded01-c37a-4179-aca3-f6677db0c029" />  

## Future Work
- add chatbot for inquries
- add medical report reading 

