let students = [];
let chart = null;

// LOGIN
function login() {
const u = document.getElementById("user").value;
const p = document.getElementById("pass").value;

if (u === "admin" && p === "1234") {
document.getElementById("loginPage").style.display = "none";
document.getElementById("app").style.display = "block";
} else {
alert("Wrong Username or Password");
}
}

// ADD STUDENT
function addStudent() {
const name = document.getElementById("name").value;
const roll = document.getElementById("roll").value;
const marks = document.getElementById("marks").value;
const attendance = document.getElementById("attendance").value;

if (!name || !roll || !marks || !attendance) {
alert("Fill all fields");
return;
}

students.push({
name: name,
roll: roll,
marks: Number(marks),
attendance: Number(attendance)
});

saveData();
renderTable();

document.getElementById("name").value = "";
document.getElementById("roll").value = "";
document.getElementById("marks").value = "";
document.getElementById("attendance").value = "";
}

// RANK
function rank(marks) {
if (marks >= 90) return "A+";
if (marks >= 75) return "A";
if (marks >= 60) return "B";
return "C";
}

// DASHBOARD
function updateDashboard() {
document.getElementById("totalStudents").textContent = students.length;

let total = 0;
students.forEach(s => total += s.marks);

let avg = students.length ? (total / students.length).toFixed(1) : 0;
document.getElementById("averageMarks").textContent = avg;

let top = "-";
let highest = -1;

students.forEach(s => {
if (s.marks > highest) {
highest = s.marks;
top = s.name;
}
});

document.getElementById("topStudent").textContent = top;
}

// TABLE
function renderTable(list = students) {
const table = document.getElementById("studentTable");
table.innerHTML = "";

list.forEach((s, i) => {
table.innerHTML += "<tr> <td>${s.name}</td> <td>${s.roll}</td> <td>${s.marks}</td> <td>${s.attendance}%</td> <td>${rank(s.marks)}</td> <td> <button onclick="editStudent(${i})">Edit</button> <button onclick="deleteStudent(${i})">Delete</button> </td> </tr>";
});

updateDashboard();
updateChart();
}

// EDIT
function editStudent(i) {
const s = students[i];

document.getElementById("name").value = s.name;
document.getElementById("roll").value = s.roll;
document.getElementById("marks").value = s.marks;
document.getElementById("attendance").value = s.attendance;

students.splice(i, 1);

saveData();
renderTable();
}

// DELETE
function deleteStudent(i) {
students.splice(i, 1);

saveData();
renderTable();
}

// SEARCH
function searchStudent() {
const value = document.getElementById("search").value.toLowerCase();

const filtered = students.filter(s =>
s.name.toLowerCase().includes(value) ||
s.roll.toString().includes(value)
);

renderTable(filtered);
}

// SAVE
function saveData() {
localStorage.setItem("students", JSON.stringify(students));
}

// CHART
function updateChart() {
const ctx = document.getElementById("chart");

if (!ctx) return;

const labels = students.map(s => s.name);
const marks = students.map(s => s.marks);

if (chart) {
chart.destroy();
}

chart = new Chart(ctx, {
type: "bar",
data: {
labels: labels,
datasets: [{
label: "Marks",
data: marks
}]
}
});
}

// LOAD
window.onload = function () {
const data = localStorage.getItem("students");

if (data) {
students = JSON.parse(data);
}

renderTable();
};
