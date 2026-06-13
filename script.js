const addButton = document.querySelector("button");
const table = document.querySelector("table");

addButton.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;
    const marks = document.getElementById("marks").value;

    if (name === "" || roll === "" || marks === "") {
        alert("Please fill all fields");
        return;
    }

    const row = table.insertRow();

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerHTML = name;
    cell2.innerHTML = roll;
    cell3.innerHTML = marks;

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("marks").value = "";
});
