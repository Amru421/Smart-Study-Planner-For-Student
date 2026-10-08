# Smart-Study-Planner-For-Student

Here is a **complete README.md** you can directly add to your GitHub repository.

# 📚 Student Study Planner

A simple and responsive **Student Study Planner Website** designed to help students organize their studies, manage daily tasks, create timetables, and track their overall study progress.

The project is built using **HTML, CSS, and JavaScript** and stores user data directly in the browser using **Local Storage**.

---

## 🌟 Features

### 🏠 Dashboard

* View total number of subjects
* View total study tasks
* View completed tasks
* View overall study progress
* Study motivation/tip section

### 📚 Subject Management

* Add new subjects
* Display all added subjects
* Delete subjects
* Subjects are saved automatically

### 📝 Daily Study Planner

* Add study tasks
* Select task priority:

  * Low
  * Medium
  * High
* Mark tasks as completed
* Edit saved task names
* Delete tasks
* Filter tasks by completion status and priority
* Automatically calculate completion percentage

### 🕐 Weekly Timetable

* View a weekly study schedule
* Organize morning, afternoon, and evening study sessions

### 📊 Progress Tracking

* Display total tasks
* Display completed tasks
* Display remaining tasks
* Calculate overall completion percentage
* Dynamic progress bar

### 🌙 Dark Mode

* Switch between light and dark themes
* Dark-mode preference is saved in the browser
* The toggle exposes its current state to assistive technology

### 💾 Local Storage

The website uses browser **Local Storage** to save:

* Subjects
* Study tasks
* Task completion status
* Dark-mode preference

Use **Progress → Back up your planner** to download or restore a versioned JSON backup of subjects and tasks.

No database is required.

---

## 🛠️ Technologies Used

| Technology    | Purpose                         |
| ------------- | ------------------------------- |
| HTML5         | Website structure               |
| CSS3          | Styling and responsive design   |
| JavaScript    | Functionality and interactivity |
| Local Storage | Saving user data                |

---

## 📂 Project Structure

```text
student-study-planner/
│
├── index.html
├── subjects.html
├── planner.html
├── timetable.html
├── progress.html
│
├── css/
│   └── style.css
│
└── js/
    └── script.js
```

---

## 🚀 How to Run the Project

### Method 1 — Using a Browser

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html`.
4. The website will open in your browser.

---

### Method 2 — Using VS Code

1. Open **VS Code**.
2. Select **File → Open Folder**.
3. Select the `student-study-planner` folder.
4. Open `index.html`.
5. Right-click the file.
6. Select **Open with Live Server**.

> If Live Server is not installed, install the **Live Server** extension from the VS Code Extensions marketplace.

---

## 💻 How It Works

### Adding a Subject

Go to:

```text
Subjects → Enter Subject → Add Subject
```

The subject is stored in Local Storage and displayed on the page.

### Adding a Study Task

Go to:

```text
Planner → Enter Task → Select Priority → Add Task
```

Example:

```text
Task: Study Verilog
Priority: High
```

### Completing a Task

Click the checkbox beside a task.

The website automatically:

```text
Updates completed tasks
        ↓
Calculates progress
        ↓
Updates progress bar
        ↓
Updates dashboard
```

---

## 📊 Progress Calculation

The project calculates progress using:

```text
Progress =
(Completed Tasks / Total Tasks) × 100
```

For example:

```text
Total Tasks = 10
Completed Tasks = 7

Progress = (7 / 10) × 100

Progress = 70%
```

---

## 🎯 Project Objectives

The main objectives of this project are:

* Help students organize their academic work.
* Make daily study planning easier.
* Track completed and pending tasks.
* Encourage consistent study habits.
* Provide a simple and user-friendly interface.
* Demonstrate practical use of HTML, CSS, and JavaScript.

---

## 📱 Responsive Design

The website is designed to work on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

CSS media queries are used to adjust the layout for smaller screens.

---

## 🔐 Data Storage

This project does not require a server or database.

Data is stored locally in the user's browser using:

```javascript
localStorage
```

Therefore, the data is specific to the browser/device being used.

---

## 🔮 Future Enhancements

The project can be extended with:

* 🔐 Student login and registration
* ☁️ Cloud database
* 📅 Calendar integration
* ⏰ Study reminders
* 🔔 Notifications
* ⏱️ Pomodoro study timer
* 📈 Subject-wise progress charts
* 🎓 Exam countdown
* 📝 Notes section
* 📊 Weekly/monthly study reports
* 🤖 AI study-plan generator
* 🌐 Online synchronization
* 📱 PWA/mobile app support

---

## 🧑‍💻 Future AI Feature

A future version could include an **AI Study Assistant** that generates personalized study plans.

For example:

```text
Student Input:
Exam in 30 days
5 subjects
2 hours available per day

        ↓

AI Study Planner

        ↓

Personalized 30-Day Study Schedule
```

---

## 🎓 Learning Outcomes

Through this project, you can learn:

* HTML page structure
* CSS layouts
* Flexbox
* CSS Grid
* Responsive design
* JavaScript DOM manipulation
* JavaScript functions
* Arrays and objects
* Event handling
* Local Storage
* Dynamic progress calculation
* Multi-page website development

---

## 📸 Project Pages

The project contains five main pages:

### 🏠 Home

Dashboard and study overview.

### 📚 Subjects

Manage academic subjects.

### 📝 Planner

Create and manage daily study tasks.

### 🕐 Timetable

View weekly study schedules.

### 📊 Progress

Track study completion and performance.

---

## 👩‍💻 Author

**Varsha**

Student Developer

Interested in:

* Web Development
* AI & Generative AI
* Software Projects
* Technology

---

## 📄 License

This project is created for **educational and personal project purposes**.

You are free to modify and improve the project for learning purposes.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Keep Learning. Keep Building. Keep Growing. 🚀**
