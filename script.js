let students = [];
let chart;

// LOGIN
function login() {
let u = document.getElementById("user").value;
let p = document.getElementById("pass").value;

if (u === "admin" && p === "1234") {
document.getElementById("loginPage").style.display = "none";
document.getElementById("app").style.display = "block";
} else {
alert("Wrong login");
}
}

// ADD STUDENT
function addStudent() {
let name = document.getElementById("name").value;
let roll = document.getElementById("roll").value;
let marks = Number(document.getElementById("marks").value);
let attendance = Number(document.getElementById("attendance").value);

if (name === "" || roll === "" || marks === 0) {
alert("Fill all fields");
return;
}

students.push({
name: name,
roll: roll,
marks: marks,
attendance: attendance
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

let totalMarks = 0;

students.forEach(function(student) {
totalMarks += student.marks;
});

let average = 0;

if (students.length > 0) {
average = (totalMarks / students.length).toFixed(1);
}

document.getElementById("averageMarks").textContent = average;

let topStudent = "-";
let highest = 0;

students.forEach(function(student) {
if (student.marks > highest) {
highest = student.marks;
topStudent = student.name;
}
});

document.getElementById("topStudent").textContent = topStudent;
}

// TABLE
function renderTable(list = students) {
let table = document.getElementById("studentTable");
table.innerHTML = "";

list.forEach(function(s, i) {
table.innerHTML += "<tr> <td>${s.name}</td> <td>${s.roll}</td> <td>${s.marks}</td> <td>${s.attendance}%</td> <td>${rank(s.marks)}</td> <td> <button onclick="editStudent(${i})">Edit</button> <button onclick="deleteStudent(${i})">Delete</button> </td> </tr>";
});

updateDashboard();
updateChart();
}

// EDIT
function editStudent(i) {
let s = students[i];

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
let val = document.getElementById("search").value.toLowerCase();

let filtered = students.filter(function(student) {
return (
student.name.toLowerCase().includes(val) ||
student.roll.toString().includes(val)
);
});

renderTable(filtered);
}

// SAVE
function saveData() {
localStorage.setItem("students", JSON.stringify(students));
}

// CHART
function updateChart() {
let ctx = document.getElementById("chart");

let labels = students.map(function(s) {
return s.name;
});

let marks = students.map(function(s) {
return s.marks;
});

if (chart) {
chart.destroy();
}

chart = new Chart(ctx, {
type: "bar",
data: {
labels: labels,
datasets: [{
label: "Marks",
data: marks,
backgroundColor: "blue"
}]
}
});
}

// LOAD DATA
window.onload = function() {
let data = localStorage.getItem("students");

if (data) {
students = JSON.parse(data);
renderTable();
}
};
