# 🎓 Student Academic Risk Identification System

A full-stack web application that automatically identifies academically at-risk students using a weighted scoring algorithm. The system provides role-based dashboards for Admins, Mentors, and Students with real-time risk classification.

---

## 📸 Overview

| Role | What they can do |
|------|-----------------|
| **Admin** | Upload student CSV, manage mentors (add/remove), assign mentors to students, delete students |
| **Mentor** | View assigned students sorted by risk score, add feedback comments |
| **Student** | View personal academic profile, risk score, risk level and mentor comments |

---

## 🏗️ Architecture

This project follows a **3-Tier Client-Server Architecture** with the **MVC design pattern**.

```
┌─────────────────────────────────┐
│   Tier 1 — Presentation         │
│   React 18 + Vite  (port 3000)  │
└────────────────┬────────────────┘
                 │ HTTP / JSON (Axios)
┌────────────────▼────────────────┐
│   Tier 2 — Application          │
│   Spring Boot 3  (port 8080)    │
└────────────────┬────────────────┘
                 │ SQL via Hibernate JPA
┌────────────────▼────────────────┐
│   Tier 3 — Data                 │
│   PostgreSQL 14                 │
└─────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool and dev server |
| React Router | 6 | Client-side routing |
| Axios | 1.6 | HTTP requests |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Spring Boot | 3.2.5 | Application framework |
| Java | 21 | Language |
| Spring Data JPA | 3.2.5 | ORM / database access |
| OpenCSV | 5.9 | CSV file parsing |
| SpringDoc OpenAPI | 2.5 | Swagger UI |

### Database
| Technology | Version | Purpose |
|-----------|---------|---------|
| PostgreSQL | 14+ | Primary database |
| Hibernate | 6.x | ORM (auto DDL) |

---

## 📁 Project Structure

```
student-risk-system/
│
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/studentrisk/
│       │   ├── StudentRiskApplication.java
│       │   ├── model/
│       │   │   ├── User.java
│       │   │   ├── Student.java
│       │   │   └── Comment.java
│       │   ├── repository/
│       │   │   ├── UserRepository.java
│       │   │   ├── StudentRepository.java
│       │   │   └── CommentRepository.java
│       │   ├── service/
│       │   │   ├── AuthService.java
│       │   │   ├── StudentService.java
│       │   │   ├── CommentService.java
│       │   │   └── RiskCalculator.java
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   ├── StudentController.java
│       │   │   ├── UserController.java
│       │   │   └── CommentController.java
│       │   ├── dto/
│       │   │   ├── LoginRequest.java
│       │   │   ├── LoginResponse.java
│       │   │   └── CommentRequest.java
│       │   └── config/
│       │       ├── DataInitializer.java
│       │       └── SwaggerConfig.java
│       └── resources/
│           └── application.properties
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.jsx
│       ├── index.css
│       ├── api/
│       │   └── axios.js
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── MentorDashboard.jsx
│       │   └── StudentDashboard.jsx
│       └── components/
│           ├── Navbar.jsx
│           └── RiskBadge.jsx
│
└── sample_students_tamil.csv
```

---

## 🗄️ Database Schema

```
USERS                        STUDENTS                     COMMENTS
─────────────────            ─────────────────────        ─────────────────
id          bigint PK        id            bigint PK      id          bigint PK
username    varchar          mentorId      bigint FK ───► USERS.id    
password    varchar          name          varchar        studentId   bigint FK ───► STUDENTS.id
role        varchar          rollNumber    varchar        mentorId    bigint FK ───► USERS.id
name        varchar          username      varchar        mentorName  varchar
department  varchar          attendance    double         text        text
                             prevCgpa      double         createdAt   timestamp
                             currCgpa      double
                             recentTest    double
                             internalMark  double
                             project       double
                             projectScore  double
                             backlogs      int
                             riskScore     double
                             riskLevel     varchar
```

---

## 🧮 Risk Score Formula

```
Risk Score =
  (100 − attendance)       × 0.15
+ (100 − currCGPA × 10)   × 0.20
+ (100 − prevCGPA × 10)   × 0.10
+ (100 − recentTest)       × 0.15
+ (100 − internalMark)     × 0.10
+ (backlogs × 10)          × 0.10
+ (100 − projectScore)     × 0.10
+ (100 − project)          × 0.10
──────────────────────────────────
Total (clamped between 0 and 100)
```

### Risk Classification

| Score | Level |
|-------|-------|
| 0 – 33 | 🟢 LOW |
| 34 – 66 | 🟡 MEDIUM |
| 67 – 100 | 🔴 HIGH |

---

## 🚀 Getting Started

### Prerequisites

- Java 21
- Maven 3.8+
- Node.js 18+
- PostgreSQL 14+

---

### Step 1 — Create the Database

```sql
CREATE DATABASE student_risk_db;
```

---

### Step 2 — Configure the Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/student_risk_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
```

---

### Step 3 — Run the Backend

```bash
cd backend
mvn clean spring-boot:run
```

> Backend starts at **http://localhost:8080**  
> Tables are auto-created by Hibernate on first run.  
> Default users are seeded automatically.

---

### Step 4 — Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

> Frontend starts at **http://localhost:3000**

---

## 🔑 Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Mentor | `mentor1` | `mentor123` |
| Mentor | `mentor2` | `mentor123` |
| Student | `21CS001` | `21CS001` |

> **Student login:** Username and password are both the roll number.  
> Student accounts are auto-created when a CSV is uploaded.

---

## 📤 CSV Upload Format

Row 1 must be the header (it is ignored). Columns must be in this exact order:

```
name, rollNumber, attendance, prevCgpa, currCgpa, recentTest, internalMark, project, projectScore, backlogs
```

**Example row:**
```
Arjun Kumar,21CS001,85.5,7.8,8.1,72,75,90,82,0
```

### CSV Upload Behaviour

| Student in CSV | Already exists? | Result |
|---------------|-----------------|--------|
| Yes | No | Created, assigned to selected mentor, login account auto-created |
| Yes | Yes | Academic data updated, risk recalculated — mentor and login unchanged |
| Not in CSV | Yes | Completely untouched |

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| GET | `/students` | Get all students |
| POST | `/students/upload?mentorId={id}` | Upload student CSV |
| GET | `/students/mentor/{mentorId}` | Get students by mentor |
| GET | `/students/{id}` | Get student by user ID |
| PUT | `/students/{studentId}/assign-mentor/{mentorId}` | Assign mentor |
| DELETE | `/students/{id}` | Delete student |
| GET | `/users/mentors` | Get all mentors |
| POST | `/users/mentors` | Add new mentor |
| DELETE | `/users/mentors/{id}` | Remove mentor |
| POST | `/comments` | Add comment |
| GET | `/comments/{studentId}` | Get comments for student |

---

## 📖 Swagger UI

After starting the backend, open the interactive API docs at:

```
http://localhost:8080/swagger-ui/index.html
```

---

## ✨ Features

- Role-based login — Admin, Mentor, Student
- CSV bulk upload with smart upsert (no data loss)
- Auto student login account creation on CSV upload
- Weighted risk score calculated automatically
- Risk classification — Low, Medium, High
- Mentor management — add with name and department, remove
- Mentor assignment per student
- Mentor feedback comments on students
- Student delete with full cascade (comments + login removed)
- Swagger UI for API testing

