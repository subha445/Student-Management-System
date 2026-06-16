let students = [];
let chart;

// 🔐 LOGIN
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

// ➕ ADD
function addStudent() {
  let name = document.getElementById("name").value;
  let roll = document.getElementById("roll").value;
  let marks = document.getElementById("marks").value;
  let attendance = document.getElementById("attendance").value;

  students.push({
    name,
    roll,
    marks: Number(marks),
    attendance: Number(attendance)
  });

  saveData();
  renderTable();
}

// 🧠 RANK
function rank(marks) {
  if (marks >= 90) return "A+";
  else if (marks >= 75) return "A";
  else if (marks >= 60) return "B";
  else return "C";
}

// 🧾 TABLE
function renderTable(list = students) {
  let table = document.getElementById("studentTable");
  table.innerHTML = "";

  list.forEach((s, i) => {
    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.roll}</td>
        <td>${s.marks}</td>
        <td>${s.attendance}%</td>
        <td>${rank(s.marks)}</td>
        <td>
          <button onclick="editStudent(${i})">Edit</button>
          <button onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>
    `;
  });

  updateChart();
}

// ✏️ EDIT
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

// ❌ DELETE
function deleteStudent(i) {
  students.splice(i, 1);
  saveData();
  renderTable();
}

// 🔍 SEARCH
function searchStudent() {
  let val = document.getElementById("search").value.toLowerCase();

  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(val) ||
    s.roll.toString().includes(val)
  );

  renderTable(filtered);
}

// 💾 LOCAL STORAGE
function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}
function updateDashboard() {
}
// 📊 CHART
function updateChart() {
  let ctx = document.getElementById("chart");

  let labels = students.map(s => s.name);
  let marks = students.map(s => s.marks);

  if (chart) chart.destroy();

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
window.onload = function () {
  let data = localStorage.getItem("students");
  if (data) {
    students = JSON.parse(data);
    renderTable();
  }
};
