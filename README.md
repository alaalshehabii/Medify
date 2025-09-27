# 🩺 Medify — Health & Wellness Management System

**Medify** is a full-stack web app that helps **patients** and **doctors** manage care in one place.  
It combines **telehealth / in-clinic appointments** with a **medication & prescription tracker** to reduce missed visits and improve adherence.

---

## ✨ What it does

- **Patients**
  - Create a profile (name, DOB, allergies, contact)
  - Book appointments (video or in-person)
  - See upcoming/past visits and view prescriptions

- **Doctors**
  - Manage schedules and patient appointments
  - Review basic patient info before visits
  - Track which medications are prescribed to which patients

---

## 🧩 Core Features

- **Patient Management** — demographics & allergies  
- **Doctor Management** — specialty & license info  
- **Appointments** — date/time, **mode** (video/clinic), **status** (upcoming/completed/canceled), notes  
- **Medications** — name, form, strength  
- **Prescriptions** — link a patient to a medication with dosage, frequency, start/end dates, refills  

**Data relationships**
- Patient **1—M** Appointment  
- Doctor **1—M** Appointment  
- Patient **1—M** Prescription  
- Medication **1—M** Prescription

---

## 🛠️ Technologies (at a glance)

- **Node.js + Express** — server and routing  
- **MongoDB + Mongoose** — database & schemas  
- **EJS + express-ejs-layouts** — server-rendered views with a shared layout  
- **CSS** — lightweight custom styling  
- **method-override, morgan, dotenv** — helpful Express utilities

> Architecture: classic **MVC** — `models/`, `controllers/`, `routes/`, `views/` for clarity and easy scaling.

---

## 🗺️ Roadmap (next steps)

- **Authentication**: Patient & Doctor login, session management, role-based dashboards  
- **Doctor availability**: schedule settings  
- **Telehealth room**: video session placeholder  
- **Notifications**: optional dose/refill reminders (stored or generated dynamically)

---

## 📌 Summary

Medify is a focused, portfolio-friendly app showing real-world CRUD in healthcare:  
**Patients, Doctors, Appointments, Medications, Prescriptions** — all in one organized experience.
