# 🏥 Medify – Health & Wellness Management System

**Medify** is a full-stack CRUD web application that combines **Telehealth Appointments** with a **Medication Tracker**.  
It is designed to help patients and doctors manage healthcare tasks in one place.

---

## 🎯 Purpose
Medify provides an easy way for:
- **Patients** to book doctor appointments, keep track of their medications, and receive reminders.  
- **Doctors** to manage their schedules and track patient appointments.  
- **Both** to reduce missed appointments, improve medication adherence, and organize care.  

---

## ⚡ Main Features

### 👤 Patient Management
- Store patient details: full name, date of birth, allergies.  
- Link each patient with multiple appointments and prescriptions.  

### 🩺 Doctor Management
- Store doctor profiles: full name, specialty, license number.  
- Each doctor can manage many appointments.  

### 📅 Telehealth Appointment System
- Patients schedule appointments with doctors.  
- Appointment details include:
  - Date & Time  
  - Mode → `video` (telehealth) or `clinic` (in-person)  
  - Status → `upcoming`, `completed`, `canceled`  
  - Notes for extra information  

👉 **Why?** Helps organize healthcare visits, both online and in person.  

### 💊 Medication Tracker
- Stores a database of medications (name, form, strength).  
- Prescriptions include dosage, frequency, and refill info.  
- Reminders notify patients to take or refill meds.  

👉 **Why?** Improves adherence to treatment and keeps doctors informed.  

---

## 🔗 Data Relationships

- One **Patient** → many **Appointments**  
- One **Doctor** → many **Appointments**  
- One **Patient** → many **Prescriptions**  
- One **Medication** → many **Patients**  
- One **Prescription** → many **Reminders**  

---

## 🛠️ Use Cases

### For Patients
- Book appointments online  
- View upcoming & past visits  
- Track prescriptions & medications  
- Receive medication reminders  

### For Doctors
- Manage appointment schedules  
- View patient information before visits  
- Track patients’ medications  

### As a Demo/Prototype
- Demonstrates CRUD operations in a realistic healthcare scenario  
- Strong portfolio project for **full-stack development**  

---
