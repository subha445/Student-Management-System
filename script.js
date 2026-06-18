function renderTable(list = students) {
const table = document.getElementById("studentTable");
table.innerHTML = "";

list.forEach((s, i) => {
table.innerHTML += "<tr> <td>${s.name}</td> <td>${s.roll}</td> <td>${s.marks}</td> <td>${s.attendance}%</td> <td>${rank(s.marks)}</td> <td> <button onclick="editStudent(${i})">Edit</button> <button onclick="deleteStudent(${i})">Delete</button> </td> </tr>";
});

updateDashboard();
updateChart();
}
