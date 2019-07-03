function testResults(form) {
    var regNo = form.regNo.value;
    var name = form.name.value;
    var grade = form.grade.value;
    var maths = form.maths.value;
    var physics = form.physics.value;
    var chemistry = form.chemistry.value;
    var computers = form.computers.value;
    if (regNo && name && grade && maths && physics &&
        chemistry && computers) {
        var table = document.getElementById("table");
        var len = document.getElementById("table").rows.length;
        var row = table.insertRow(len);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        cell1.innerHTML = regNo;
        cell2.innerHTML = name;
        cell3.innerHTML = grade;
        cell4.innerHTML = maths;
        cell5.innerHTML = physics;
        cell6.innerHTML = chemistry;
        cell7.innerHTML = computers
    }else {
        alert("Please, Fill up all the fields :|")
    }
}

function fab() {
    var element = document.getElementById("form");
    if(element.style.display == "flex") {
        element.style.display = "none";
    }else {
        element.style.display = "flex";
    }
}