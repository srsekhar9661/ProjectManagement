# 🚀 Project Management Application

A full-stack **Project Management System** built using **Django REST Framework (Backend)** and **React (Frontend)**.
This application allows users to create projects, manage tasks, and collaborate with team members efficiently.

---

## 🥅 Aim
* My aim is to create a Project Management Took which is a open source tool for the startups , Freelancers or other developers to manage their own projects and collaborate with other team members.

## 📌 Features

* 🗂️ Create and manage projects
* ✅ Add, update, and delete tasks
* 👥 Assign tasks to team members
* 📊 Track task status (To Do / In Progress / Done)
* 🔐 User authentication and authorization
* ⚡ Fast and interactive UI using React
* 🔄 RESTful API integration between frontend and backend

---

## 🏗️ Tech Stack

### 🔹 Backend

* Python
* Django
* Django REST Framework (DRF)

### 🔹 Frontend

* React (with modern hooks)
* Axios (for API calls)
* CSS / Tailwind / Bootstrap (based on usage)

### 🔹 Database

* SQLite (default)
* Can be extended to PostgreSQL

---

## 📁 Project Structure

```
project-management-app/
│
├── backend/               # Django Backend
│   ├── core/             # Main project settings
│   ├── projects/         # App for project & task management
│   └── manage.py
│
├── frontend/             # React Frontend
│   ├── src/
│   └── public/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone the Repository

```
git clone https://github.com/srsekhar9661/ProjectManagement.git
cd project-management-app
```

---

### 🔹 2. Backend Setup (Django)

```
cd backend

python -m venv venv
```

#### Activate Virtual Environment

**Windows:**

```
venv\Scripts\activate
```

**Mac/Linux:**

```
source venv/bin/activate
```

#### Install Dependencies

```
pip install -r requirements.txt
```

#### Run Migrations

```
python manage.py migrate
```

#### Start Server

```
python manage.py runserver
```

---

### 🔹 3. Frontend Setup (React)

```
cd frontend
npm install
npm start
```

---

## 🔗 API Endpoints (Sample)

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | /api/projects/   | List all projects |
| POST   | /api/projects/   | Create project    |
| GET    | /api/tasks/      | List tasks        |
| POST   | /api/tasks/      | Create task       |
| PUT    | /api/tasks/{id}/ | Update task       |
| DELETE | /api/tasks/{id}/ | Delete task       |

---

## 🧠 Future Enhancements

* 🔔 Notifications system
* 💬 Comments on tasks
* 📅 Deadline & reminders
* 📊 Dashboard analytics
* 🌐 Deployment (AWS / Vercel / Render)

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Raja Sekhar**

* GitHub: https://github.com/srsekhar9661
* Portfolio: Coming Soon 🚀

---


# Installing Taiwlwind CSS
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
