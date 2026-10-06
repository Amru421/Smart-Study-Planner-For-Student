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


    list.innerHTML = "";


    subjects.forEach(
        function(subject, index) {

            const div =
                document.createElement("div");

            div.className =
                "subject-card";


            div.innerHTML = `

                <h3>📘 ${subject}</h3>

                <p>
                    Keep learning and practicing.
                </p>

                <br>

                <button
                    class="delete-btn"
                    onclick="deleteSubject(${index})">

                    Delete

                </button>

            `;


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


    list.innerHTML = "";


    tasks.forEach(
        function(task, index) {

            const div =
                document.createElement("div");

            div.className =
                "task";


            if (task.completed) {

                div.classList.add("completed");

            }


            const priorityClass =
                task.priority.toLowerCase();


            div.innerHTML = `

                <div class="task-left">

                    <input
                        type="checkbox"
                        ${task.completed ? "checked" : ""}
                        onchange="toggleTask(${index})">

                    <span>
                        ${task.name}
                    </span>

                    <span
                        class="priority ${priorityClass}">

                        ${task.priority}

                    </span>

                </div>


                <button
                    class="delete-btn"
                    onclick="deleteTask(${index})">

                    Delete

                </button>

            `;


            list.appendChild(div);

        }
    );
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