# 📝 QuickTask

**QuickTask** is a minimalist, responsive task manager built with React. It focuses on simplicity, speed, and usability — perfect for managing your daily todos.

## ✨ Features

- ✅ Add, edit, complete, and delete tasks
- 🔁 Filter tasks by All / Active / Completed
- 🧹 Delete all completed tasks at once
- 🔒 Prevent editing completed tasks
- ⌨️ Keyboard support (Enter to submit, Escape to cancel)
- 📱 Fully responsive UI for mobile and desktop
- 🗑️ Confirmation dialog before deleting all completed tasks
- 📊 Task summary display with real-time counts

## 🚀 Getting Started

### 1. Clone the repository

```
bash
git clone https://github.com/nightlydriver/quicktask.git
cd quicktask
```

### 2. Install dependencies

```
npm install
```

### 3. Start the development server

```
npm start
```
The app will run on http://localhost:3000

## 🛠 Tech Stack
- React
- Bootstrap 5

## 📂 Project Structure
```
src/
├── _components/        # React components
│   ├── AddNewTask.jsx
│   ├── DeleteCompletedTasks.jsx
│   ├── FilterButtons.jsx
│   ├── TaskItem.jsx
│   ├── TaskList.jsx
│   └── TaskSummary.jsx
├── App.jsx             # Main app container
└── index.js            # Entry point
```

## 🧪 TODOs / Future Improvements
- Add custom modal dialogs
- Add drag-and-drop reordering
- UX Improvements and visual styles
- Task due dates
- Import/export feature
- Dark mode support

---
Feel free to customize or improve the app — contributions are welcome!
