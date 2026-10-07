// ===============================
// DARK MODE
// ===============================

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("darkMode", "true");

    } else {

        localStorage.setItem("darkMode", "false");

    }
}


window.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("darkMode") === "true") {

        document.body.classList.add("dark");

    }

    loadSubjects();
    loadTasks();
    updateDashboard();
    updateProgress();

});


// ===============================
// SUBJECTS
// ===============================

function addSubject() {

    const input =
        document.getElementById("subjectInput");

    if (!input) return;

    const subject =
        input.value.trim();

    if (subject === "") {

        alert("Please enter a subject.");

        return;
    }


    let subjects =
        JSON.parse(
            localStorage.getItem("subjects")
        ) || [];

    if (subjects.some(function (savedSubject) {
        return typeof savedSubject === "string"
            && savedSubject.trim().toLowerCase() === subject.toLowerCase();
    })) {
        alert("That subject has already been added.");
        return;
    }

    subjects.push(subject);


    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );


    input.value = "";

    loadSubjects();

    updateDashboard();
}


function loadSubjects() {

    const list =
        document.getElementById("subjectList");

    if (!list) return;


    let subjects =
        JSON.parse(
            localStorage.getItem("subjects")
        ) || [];


    list.replaceChildren();

    if (subjects.length === 0) {
        const emptyState = document.createElement("p");
        emptyState.className = "empty-state";
        emptyState.textContent = "No subjects yet. Add one above to get started.";
        list.appendChild(emptyState);
        return;
    }

    subjects.forEach(
        function(subject, index) {

            const div =
                document.createElement("div");

            div.className =
                "subject-card";


            const title = document.createElement("h3");
            title.textContent = `📘 ${subject}`;

            const description = document.createElement("p");
            description.textContent = "Keep learning and practicing.";

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                deleteSubject(index);
            });

            div.append(title, description, deleteButton);
            list.appendChild(div);

        }
    );
}


function deleteSubject(index) {

    let subjects =
        JSON.parse(
            localStorage.getItem("subjects")
        ) || [];


    subjects.splice(index, 1);


    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );


    loadSubjects();

    updateDashboard();
}


// ===============================
// TASKS
// ===============================

function addTask() {

    const input =
        document.getElementById("taskInput");

    const priority =
        document.getElementById("priority");


    if (!input) return;


    const taskName =
        input.value.trim();


    if (taskName === "") {

        alert("Please enter a task.");

        return;
    }


    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    tasks.push({

        name: taskName,

        priority: priority.value,

        completed: false

    });


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    input.value = "";


    loadTasks();

    updateDashboard();

    updateProgress();
}


function loadTasks() {

    const list =
        document.getElementById("taskList");

    if (!list) return;


    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    list.replaceChildren();

    const statusFilter =
        document.getElementById("taskStatusFilter")?.value || "all";
    const priorityFilter =
        document.getElementById("taskPriorityFilter")?.value || "all";
    const visibleTasks = tasks
        .map(function (task, index) {
            return { task: task, index: index };
        })
        .filter(function (entry) {
            const statusMatches = statusFilter === "all"
                || (statusFilter === "completed" && entry.task.completed)
                || (statusFilter === "pending" && !entry.task.completed);
            const priorityMatches = priorityFilter === "all"
                || (typeof entry.task.priority === "string"
                    && entry.task.priority.toLowerCase() === priorityFilter);
            return statusMatches && priorityMatches;
        });

    if (visibleTasks.length === 0) {
        const emptyState = document.createElement("p");
        emptyState.className = "empty-state";
        emptyState.textContent = tasks.length === 0
            ? "No tasks yet. Add one above to get started."
            : "No tasks match these filters.";
        list.appendChild(emptyState);
        return;
    }

    visibleTasks.forEach(
        function(entry) {
            const task = entry.task;
            const index = entry.index;

            const div =
                document.createElement("div");

            div.className =
                "task";


            if (task.completed) {

                div.classList.add("completed");

            }


            const taskContent = document.createElement("div");
            taskContent.className = "task-left";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.setAttribute("aria-label", `Mark ${task.name} as completed`);
            checkbox.addEventListener("change", function () {
                toggleTask(index);
            });

            const name = document.createElement("span");
            name.textContent = task.name;

            const taskPriority = typeof task.priority === "string"
                ? task.priority
                : "Low";
            const priority = document.createElement("span");
            priority.className = "priority";
            if (["low", "medium", "high"].includes(taskPriority.toLowerCase())) {
                priority.classList.add(taskPriority.toLowerCase());
            }
            priority.textContent = taskPriority;

            taskContent.append(checkbox, name, priority);

            const actions = document.createElement("div");
            actions.className = "task-actions";

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "edit-btn";
            editButton.textContent = "Edit";
            editButton.addEventListener("click", function () {
                editTask(index);
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                deleteTask(index);
            });

            actions.append(editButton, deleteButton);
            div.append(taskContent, actions);
            list.appendChild(div);

        }
    );
}

function editTask(index) {

    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];

    const updatedName = prompt("Update study task:", tasks[index].name);
    if (updatedName === null) {
        return;
    }

    const trimmedName = updatedName.trim();
    if (trimmedName === "") {
        alert("A task name cannot be empty.");
        return;
    }

    tasks[index].name = trimmedName;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}


function toggleTask(index) {

    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    tasks[index].completed =
        !tasks[index].completed;


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    loadTasks();

    updateDashboard();

    updateProgress();
}


function deleteTask(index) {

    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    tasks.splice(index, 1);


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    loadTasks();

    updateDashboard();

    updateProgress();
}


// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {

    let subjects =
        JSON.parse(
            localStorage.getItem("subjects")
        ) || [];


    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    let completed =
        tasks.filter(
            task => task.completed
        ).length;


    let progress =
        tasks.length === 0
            ? 0
            : Math.round(
                completed /
                tasks.length *
                100
            );


    const subjectCount =
        document.getElementById(
            "subjectCount"
        );


    const taskCount =
        document.getElementById(
            "taskCount"
        );


    const completedCount =
        document.getElementById(
            "completedCount"
        );


    const progressCount =
        document.getElementById(
            "progressCount"
        );


    if (subjectCount)
        subjectCount.innerText =
            subjects.length;


    if (taskCount)
        taskCount.innerText =
            tasks.length;


    if (completedCount)
        completedCount.innerText =
            completed;


    if (progressCount)
        progressCount.innerText =
            progress + "%";
}


// ===============================
// PROGRESS
// ===============================

function updateProgress() {

    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    let completed =
        tasks.filter(
            task => task.completed
        ).length;


    let total =
        tasks.length;


    let remaining =
        total - completed;


    let percentage =
        total === 0
            ? 0
            : Math.round(
                completed /
                total *
                100
            );


    const percentageElement =
        document.getElementById(
            "progressPercentage"
        );


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    const totalElement =
        document.getElementById(
            "totalTasks"
        );


    const completedElement =
        document.getElementById(
            "completedTasks"
        );


    const remainingElement =
        document.getElementById(
            "remainingTasks"
        );


    if (percentageElement)
        percentageElement.innerText =
            percentage + "%";


    if (progressBar)
        progressBar.style.width =
            percentage + "%";


    if (totalElement)
        totalElement.innerText =
            total;


    if (completedElement)
        completedElement.innerText =
            completed;


    if (remainingElement)
        remainingElement.innerText =
            remaining;
}


// ===============================
// DATA BACKUP
// ===============================

function exportPlannerData() {

    const status = document.getElementById("backupStatus");

    try {
        const backup = {
            version: 1,
            subjects: JSON.parse(localStorage.getItem("subjects") || "[]"),
            tasks: JSON.parse(localStorage.getItem("tasks") || "[]")
        };
        const blob = new Blob(
            [JSON.stringify(backup, null, 2)],
            { type: "application/json" }
        );
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `study-planner-backup-${new Date().toISOString().slice(0, 10)}.json`;
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
        status.textContent = "Backup downloaded.";
        status.classList.remove("error");
    } catch (error) {
        status.textContent = "Could not create a backup. Check browser storage permissions.";
        status.classList.add("error");
        console.error("Could not export study planner data.", error);
    }
}


async function importPlannerData(event) {

    const input = event.currentTarget;
    const file = input.files[0];
    const status = document.getElementById("backupStatus");
    if (!file) {
        return;
    }

    try {
        let backup;
        try {
            backup = JSON.parse(await file.text());
        } catch (error) {
            status.textContent = "The selected file is not valid JSON.";
            status.classList.add("error");
            console.error("Could not parse the selected planner backup.", error);
            return;
        }

        const priorities = ["Low", "Medium", "High"];
        const isValidBackup = backup
            && backup.version === 1
            && Array.isArray(backup.subjects)
            && backup.subjects.every(function (subject) {
                return typeof subject === "string" && subject.trim() !== "";
            })
            && Array.isArray(backup.tasks)
            && backup.tasks.every(function (task) {
                return task
                    && typeof task.name === "string"
                    && task.name.trim() !== ""
                    && priorities.includes(task.priority)
                    && typeof task.completed === "boolean";
            });

        if (!isValidBackup) {
            status.textContent = "This file is not a supported study planner backup.";
            status.classList.add("error");
            return;
        }

        const previousSubjects = localStorage.getItem("subjects");
        const previousTasks = localStorage.getItem("tasks");
        try {
            localStorage.setItem("subjects", JSON.stringify(backup.subjects));
            localStorage.setItem("tasks", JSON.stringify(backup.tasks));
        } catch (error) {
            try {
                if (previousSubjects === null) {
                    localStorage.removeItem("subjects");
                } else {
                    localStorage.setItem("subjects", previousSubjects);
                }
                if (previousTasks === null) {
                    localStorage.removeItem("tasks");
                } else {
                    localStorage.setItem("tasks", previousTasks);
                }
            } catch (restoreError) {
                console.error("Could not restore planner data after a failed import.", restoreError);
            }
            throw error;
        }

        loadSubjects();
        loadTasks();
        updateDashboard();
        updateProgress();
        status.textContent = "Backup imported successfully.";
        status.classList.remove("error");
        input.value = "";
    } catch (error) {
        status.textContent = "Could not import the backup. Check browser storage permissions.";
        status.classList.add("error");
        console.error("Could not import study planner data.", error);
    }
}