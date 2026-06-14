const addButton = document.getElementById("addBtn");
const table = document.getElementById("studentTable");

let totalStudents = 0;

addButton.addEventListener("click", function () {

    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;
    const marks = document.getElementById("marks").value;

    if (name === "" || roll === "" || marks === "") {
        alert("Please fill all fields");
        return;
    }

    const row = table.insertRow();

    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = roll;
    row.insertCell(2).innerHTML = marks;
    row.insertCell(3).innerHTML =
        '<button onclick="deleteStudent(this)">Delete</button>';

    totalStudents++;
    updateCounter();

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("marks").value = "";
});

function deleteStudent(button) {
    let row = button.parentNode.parentNode;
    row.remove();

    totalStudents--;
    updateCounter();
}

function updateCounter() {
    document.getElementById("totalStudents").innerText =
        "Total Students: " + totalStudents;
}

function searchStudent() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {

        let name = rows[i].cells[0].innerText.toLowerCase();
        let roll = rows[i].cells[1].innerText.toLowerCase();

        if (name.includes(input) || roll.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
