function increment() {
    let counter = 0;
    return [
        function counterIncrementer() {
            ++counter;
        },
        function accessCounter() {
            return counter;
        }
    ];
}
let counterObj = increment();
let incrementer = counterObj[0];
let access = counterObj[1];
window.onload = function() {
    // console.log("hello");
    let form = document.getElementById("form");
    // register.addEventListener("click", addRow);
    form.onsubmit = addRow;
    createEventListener();
}

function addRow() {

    let name = document.getElementById("name").value;
    let regno = document.getElementById("regno").value;
    let grade = document.getElementById("grade").value;
    let maths = document.getElementById("maths").value;
    let english = document.getElementById("english").value;
    let hindi = document.getElementById("hindi").value;
    let science = document.getElementById("science").value;
    let social = document.getElementById("social").value;

    if (name.length == 0 || regno.length == 0 || grade.length == 0 || maths.length == 0 || english.length == 0 || hindi.length == 0 || science.length == 0 || social.length == 0) {
        alert("All fields are required")

    } else {
        incrementer();
        let table = document.getElementById("table");
        let inputs = [name, regno, grade, maths, english, hindi, science, social]

        let frag = document.createDocumentFragment();
        let row = document.createElement("tr");
        let data = document.createElement("td");
        data.innerText = access();
        data.id = access();
        row.appendChild(data);
        for (let i = 0; i < inputs.length; i++) {
            let data = document.createElement("td");
            data.innerText = inputs[i];
            data.id = inputs[i];
            row.appendChild(data);
            // console.log(data);
            // console.log(row);
        }
        data = document.createElement("td");
        let button = document.createElement("button");
        button.className = "delete";
        button.id = "delete-" + access();
        button.value = "Delete";
        button.innerText = "Delete";
        row.appendChild(button);
        row.id = "row-" + access();

        frag.appendChild(row);
        // console.log(table.childNodes[1])
        table.appendChild(frag);
        emptyInputs();
    }
    // console.log(table);
}

function emptyInputs() {
    let input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
        if (input[i].id != "register")
            input[i].value = "";
    }
}

function createEventListener(element) {
    var element = document.getElementById("records");
    element.addEventListener("click", function(e) {
        console.log(e.target);
        if (e.target.className == 'delete') {
            remove_row(e.target.parentNode.id);
            // console.log(e.target.value);
        }
    });
}

function remove_row(id) {
    let table = document.getElementById("table");
    let row = document.getElementById(id);
    table.removeChild(row);
}