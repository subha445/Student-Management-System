
/* =================================
   STUDENT MANAGEMENT SYSTEM
   CYBER GOLD EDITION
================================= */

let students = [];

try {
    students = JSON.parse(localStorage.getItem("students")) || [];
    if (!Array.isArray(students)) students = [];
} catch {
    students = [];
}

let editIndex = -1;
let marksChart = null;

// ELEMENTS
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// SAVE DATA
function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

// ADD / UPDATE STUDENT
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const roll = document.getElementById("roll").value.trim();
        const marks = Number(document.getElementById("marks").value);

        if (!name || !roll || !Number.isFinite(marks)) {
            alert("Please fill in all fields.");
            return;
        }

        if (marks < 0 || marks > 500) {
            alert("Marks must be between 0 and 500.");
            return;
        }

        const duplicate = students.some((student, index) =>
            student.roll.toLowerCase() === roll.toLowerCase() &&
            index !== editIndex
        );

        if (duplicate) {
            alert("This roll number already exists.");
            return;
        }

        const student = { name, roll, marks };

        if (editIndex === -1) {
            students.push(student);
        } else {
            students[editIndex] = student;
            editIndex = -1;

            const addButton = document.querySelector(".add-btn");
            if (addButton) addButton.textContent = "Add Student";
        }

        saveData();
        form.reset();
        displayStudents();
    });
}

// DISPLAY STUDENTS
function displayStudents(data = students) {
    if (!table) return;

    table.innerHTML = "";

    data.forEach((student) => {
        const realIndex = students.indexOf(student);
        const percentage = (student.marks / 500) * 100;
        const grade = getGrade(percentage);

        const row = document.createElement("tr");

        // Safe text rendering
        [
            student.name,
            student.roll,
            `${student.marks}/500`,
            `${percentage.toFixed(1)}%`,
            grade
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actions = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "✏️ Edit";
        editButton.addEventListener("click", () => editStudent(realIndex));

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "🗑️ Delete";
        deleteButton.addEventListener("click", () => deleteStudent(realIndex));

        actions.append(editButton, deleteButton);
        row.appendChild(actions);
        table.appendChild(row);
    });

    updateDashboard();
}

// GRADE CALCULATION
function getGrade(percentage) {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
}

// EDIT STUDENT
function editStudent(index) {
    const student = students[index];
    if (!student) return;

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("marks").value = student.marks;

    editIndex = index;

    const addButton = document.querySelector(".add-btn");
    if (addButton) addButton.textContent = "Update Student";

    const section = document.getElementById("addStudent");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// DELETE STUDENT
function deleteStudent(index) {
    const student = students[index];
    if (!student) return;

    if (confirm(`Delete ${student.name}?`)) {
        students.splice(index, 1);

        if (editIndex === index) {
            editIndex = -1;
            form?.reset();

            const addButton = document.querySelector(".add-btn");
            if (addButton) addButton.textContent = "Add Student";
        } else if (editIndex > index) {
            editIndex--;
        }

        saveData();
        displayStudents();
    }
}

// SEARCH STUDENTS
function searchStudents() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    const search = searchInput.value.toLowerCase().trim();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(search) ||
        student.roll.toLowerCase().includes(search)
    );

    displayStudents(filtered);
}

// DASHBOARD
function updateDashboard() {
    const totalElement = document.getElementById("totalStudents");
    const averageElement = document.getElementById("averageMarks");
    const highestElement = document.getElementById("highestMark");

    if (totalElement) totalElement.textContent = students.length;

    if (students.length === 0) {
        if (averageElement) averageElement.textContent = "0";
        if (highestElement) highestElement.textContent = "0";
        updateChart();
        return;
    }

    const total = students.reduce((sum, student) =>
        sum + Number(student.marks), 0
    );

    const average = total / students.length;
    const highest = Math.max(...students.map(s => Number(s.marks)));

    if (averageElement) averageElement.textContent = average.toFixed(1);
    if (highestElement) highestElement.textContent = highest;

    updateChart();
}

// CYBER GOLD CHART
function updateChart() {
    const canvas = document.getElementById("marksChart");

    if (!canvas || typeof Chart === "undefined") return;

    if (marksChart) {
        marksChart.destroy();
    }

    marksChart = new Chart(canvas, {
        type: "bar",

        data: {
            labels: students.map(student => student.name),

            datasets: [{
                label: "Student Marks",
                data: students.map(student => student.marks),
                backgroundColor: "rgba(245, 197, 66, 0.65)",
                borderColor: "#ffe16b",
                borderWidth: 2,
                borderRadius: 9,
                hoverBackgroundColor: "#ffe16b"
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: true,

            plugins: {
                legend: {
                    labels: {
                        color: "#ffe16b"
                    }
                }
            },

            scales: {
                x: {
                    ticks: { color: "#c9b985" },
                    grid: { color: "rgba(245,197,66,.08)" }
                },

                y: {
                    beginAtZero: true,
                    max: 500,
                    ticks: { color: "#c9b985" },
                    grid: { color: "rgba(245,197,66,.1)" }
                }
            }
        }
    });
}

// THEME BUTTON
function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const button = document.getElementById("themeBtn");

    if (button) {
        button.textContent =
            document.body.classList.contains("light-mode")
                ? "🌙 Dark Mode"
                : "☀️ Light Mode";
    }
}

// LOGOUT
function logout() {
    sessionStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminLoggedIn");
    location.reload();
}

// INITIALIZE
displayStudents();
                          
