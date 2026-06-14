let students = [];

// Load from LocalStorage
window.onload = function () {
  let data = localStorage.getItem("students");
  if (data) {
    students = JSON.parse(data);
    renderTable();
  }
};

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
  let name = document.getElementById("name").value;
  let roll = document.getElementById("roll").value;
  let marks = document.getElementById("marks").value;
  let attendance = document.getElementById("attendance").value;

  if (!name || !roll || !marks || !attendance) return;

  students.push({
    name,
    roll,
    marks: Number(marks),
    attendance: Number(attendance),
  });

  saveData();
  renderTable();
}

function calculateRank(marks) {
  if (marks >= 90) return "A+";
  else if (marks >= 75) return "A";
  else if (marks >= 60) return "B";
  else return "C";
}

// EDIT FEATURE 🔥
function editStudent(index) {
  let s = students[index];

  document.getElementById("name").value = s.name;
  document.getElementById("roll").value = s.roll;
  document.getElementById("marks").value = s.marks;
  document.getElementById("attendance").value = s.attendance;

  // remove old record
  students.splice(index, 1);

  saveData();
  renderTable();
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveData();
  renderTable();
}

function renderTable() {
  let table = document.getElementById("studentTable");
  table.innerHTML = "";

  // Sort by marks (highest first)
  students.sort((a, b) => b.marks - a.marks);

  students.forEach((s, index) => {
    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.roll}</td>
        <td>${s.marks}</td>
        <td>${s.attendance}%</td>
        <td>${calculateRank(s.marks)}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
      }
