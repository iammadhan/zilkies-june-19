let counter = 0;

function addData() {
    let students = document.querySelectorAll(".student");
    let table = document.getElementById("myTable");

    for (let j = 0; j < students.length; j++) {
        if(students[j].value === "") {
            alert("Enter input");
            return false;
        }
    } 

    let row = table.insertRow();

    let cell = row.insertCell(0);
    cell.innerHTML = ++counter;

    for (let i = 0; i < students.length; i++) {
        cell = row.insertCell(i + 1);
        cell.innerHTML = students[i].value;
        students[i].value = "";
    }

}
