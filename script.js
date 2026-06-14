const addButton = document.getElementById("addBtn");
const table = document.getElementById("studentTable");

// 💾 Local Storage la irunthu data eduthuko
let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = -1;

let totalStudents = students.length;

// Page load aana udane table la kaatu
window.onload = function(){
    displayStudents();
    updateStats();
}

addButton.addEventListener("click", function () {
    addStudent();
});

function addStudent() {
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const marks = parseInt(document.getElementById("marks").value);

    if (name === "" || roll === "" || isNaN(marks) || marks < 0 || marks > 100) {
        alert("Please fill all fields. Marks 0-100 mattum");
        return;
    }

    if(editIndex === -1){
        // Add new student
        students.push({name, roll, marks});
    }else{
        // 📝 Update existing student
        students[editIndex] = {name, roll, marks};
        editIndex = -1;
        addButton.innerText = "Add Student";
    }

    // 💾 Save to Local Storage
    saveData();
    displayStudents();
    updateStats();

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("marks").value = "";
}

function displayStudents(){
    // Header row thavira ellam delete pannu
    while(table.rows.length > 1){
        table.deleteRow(1);
    }

    students.forEach((s, i) => {
        let grade = getGrade(s.marks);
        let row = table.insertRow();

        row.insertCell(0).innerHTML = s.name;
        row.insertCell(1).innerHTML = s.roll;
        row.insertCell(2).innerHTML = s.marks;
        row.insertCell(3).innerHTML = `<span class="grade-${grade}">🎖️ ${grade}</span>`;
        row.insertCell(4).innerHTML =
            `<button class="edit-btn" onclick="editStudent(${i})">📝 Edit</button>
             <button class="delete-btn" onclick="deleteStudent(${i})">Delete</button>`;
    });

    totalStudents
