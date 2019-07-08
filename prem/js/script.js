let counter = 0;
function showTable() {

}
function addData() {
    let students = document.querySelectorAll(".student");
    let table = document.getElementById("myTable");
    let row = table.insertRow();
    let cell = row.insertCell(0);
    cell.innerHTML = ++counter;

    for (let i = 0; i < students.length; i++) {
        cell = row.insertCell(i + 1);
        cell.innerHTML = students[i].value;
        students[i].value = "";
    }
    
    
}
