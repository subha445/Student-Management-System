let students =
    JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

const form =
    document.getElementById("studentForm");

const table =
    document.getElementById("studentTable");


/* ADD STUDENT */

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const roll =
        document.getElementById("roll").value.trim();

    const marks =
        Number(document.getElementById("marks").value);


    if (marks < 0 || marks > 500) {

        alert("Marks must be between 0 and 500");

        return;
    }


    const student = {

        name: name,

        roll: roll,

        marks: marks

    };


    if (editIndex === -1) {

        students.push(student);

    } else {

        students[editIndex] = student;

        editIndex = -1;

        document.querySelector(".add-btn").textContent =
            "Add Student";
    }


    saveData();

    form.reset();

    displayStudents();

});


/* DISPLAY STUDENTS */

function displayStudents(data = students) {

    table.innerHTML = "";


    data.forEach((student, index) => {

        const percentage =
            ((student.marks / 500) * 100).toFixed(1);


        const grade =
            getGrade(percentage);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.name}</td>

            <td>${student.roll}</td>

            <td>${student.marks}/500</td>

            <td>${percentage}%</td>

            <td>${grade}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${index})">

                    ✏️ Edit

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">

                    🗑️ Delete

                </button>

            </td>

        `;


        table.appendChild(row);

    });


    updateDashboard();

}


/* GRADE */

function getGrade(percentage) {

    if (percentage >= 90)
        return "A+";

    if (percentage >= 80)
        return "A";

    if (percentage >= 70)
        return "B";

    if (percentage >= 60)
        return "C";

    if (percentage >= 50)
        return "D";

    return "F";
}


/* DELETE */

function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        saveData();

        displayStudents();

    }

}


/* EDIT */

function editStudent(index) {

    const student =
        students[index];


    document.getElementById("name").value =
        student.name;

    document.getElementById("roll").value =
        student.roll;

    document.getElementById("marks").value =
        student.marks;


    editIndex = index;


    document.querySelector(".add-btn").textContent =
        "Update Student";


    document
        .getElementById("addStudent")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* SEARCH */

function searchStudents() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const filtered =
        students.filter(student =>

            student.name
                .toLowerCase()
                .includes(search)

            ||

            student.roll
                .toLowerCase()
                .includes(search)

        );


    displayStudents(filtered);

}


/* DASHBOARD */

function updateDashboard() {

    document.getElementById("totalStudents")
        .textContent = students.length;


    if (students.length === 0) {

        document.getElementById("averageMarks")
            .textContent = "0";

        document.getElementById("highestMark")
            .textContent = "0";

        updateChart();

        return;
    }


    const total =
        students.reduce(
            (sum, student) =>
                sum + student.marks,
            0
        );


    const average =
        total / students.length;


    const highest =
        Math.max(
            ...students.map(
                student => student.marks
            )
        );


    document.getElementById("averageMarks")
        .textContent =
        average.toFixed(1);


    document.getElementById("highestMark")
        .textContent =
        highest;


    updateChart();

}


/* SAVE DATA */

function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


/* DARK MODE */

function toggleTheme() {

    document.body.classList.toggle("dark");


    const button =
        document.getElementById("themeBtn");


    if (document.body.classList.contains("dark")) {

        button.textContent =
            "☀️ Light Mode";

    } else {

        button.textContent =
            "🌙 Dark Mode";

    }

}


/* CHART */

let marksChart;


function updateChart() {

    const canvas =
        document.getElementById("marksChart");


    const labels =
        students.map(
            student => student.name
        );


    const marks =
        students.map(
            student => student.marks
        );


    if (marksChart) {

        marksChart.destroy();

    }


    marksChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                label: "Marks",

                data: marks

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true,

                    max: 500

                }

            }

        }

    });

}


/* INITIAL LOAD */

displayStudents();
