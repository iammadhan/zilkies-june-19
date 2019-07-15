var logs = JSON.parse(localStorage.getItem("logs")) || []
const username = localStorage.getItem("sessionToken")
localStorage.removeItem("toggle")
localStorage.removeItem("editId")

console.log(logs)

// Normal Fab Actions
function fab() {
    let element = document.getElementById("form");
    if (element.style.display == "flex") {
        element.style.display = "none";
    } else {
        element.style.display = "flex";
    }
}

// Form resets
function reset(form) {
    form.workDescription.value = "";
    form.dateOfWork.value = "";
    form.hours.value = "";
    form.remainingHours.value = "";
}

// DB scripts
// Populates tables once logged in
function retriveUserInfo() {

    document.getElementById("username").style.display = "none";
    document.getElementById("editSec").style.display = "none";

    let table = document.getElementById("tableBody");
    let populateFragment = document.createDocumentFragment();
    let cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8
    let row

    if (logs) {
        logs.forEach((data) => {
            if (data.username == username) {
                row = document.createElement('tr')
                cell1 = document.createElement('td')
                cell2 = document.createElement('td')
                cell3 = document.createElement('td')
                cell4 = document.createElement('td')
                cell5 = document.createElement('td')
                cell6 = document.createElement('td')
                cell7 = document.createElement('td')
                cell8 = document.createElement('td')
                cell7.setAttribute("id", "edit")
                cell7.setAttribute("style", "cursor:pointer")
                cell7.setAttribute("onClick", "edit(" + data.id + ")")
                cell8.setAttribute("id", "edit")
                cell8.setAttribute("style", "cursor:pointer")
                cell8.setAttribute("onClick", "deleteLog(" + data.id + ")")
                cell1.innerHTML = data.id;
                cell2.innerHTML = data.workDesc;
                cell3.innerHTML = data.dateOfWork;
                cell4.innerHTML = data.hours;
                cell5.innerHTML = data.remainingHours;
                cell6.innerHTML = data.timeStamp;
                cell7.innerHTML = "Edit";
                cell8.innerHTML = "Delete";
                row.append(cell1)
                row.append(cell2)
                row.append(cell3)
                row.append(cell4)
                row.append(cell5)
                row.append(cell6)
                row.append(cell7)
                row.append(cell8)
                populateFragment.appendChild(row)
                console.log(populateFragment.appendChild(row))
            }
        })
        table.appendChild(populateFragment)
    }
}

// Initial retrival of values when the page loads up.
if (username != "Admin") {
    retriveUserInfo()
}


var globalId

function edit(a) {
    console.log(a)
    document.getElementById("addSec").style.display = "none"
    document.getElementById("editSec").style.display = "block"
    document.getElementById("form").style.display = "block"

    localStorage.setItem("toggle", "edit")
    localStorage.setItem("editId", a)

    logs.forEach((data) => {
        if (data.id == a) {
            globalId = data.id
            document.getElementById("date").value = data.dateOfWork
            document.getElementById("workDesc").value = data.workDesc
            document.getElementById("hours").value = data.hours
            document.getElementById("remainingHours").value = data.remainingHours
        }
    })
}

function deleteLog(a) {

    let deleteCount = -1

    let prevRemain
    let editCount = 0

    logs.forEach(data => {
        if (data.id == a) {
            prevRemain = parseInt(data.remainingHours) + parseInt(data.hours)
            editCount++
        } else {
            if (editCount != 0) {
                data.remainingHours = parseInt(prevRemain) - parseInt(data.hours)
                prevRemain = parseInt(data.remainingHours)
            }
        }
    });

    logs.forEach((data) => {
        deleteCount++
        if (data.id == a) {
            logs.splice(deleteCount, 1)
        }
    })

    localStorage.setItem("logs", JSON.stringify(logs))

    location.reload()

    alert("Successfully deleted.")
}

function editFields(form) {

    let workDesc = form.workDescription.value
    let dateOfWork = form.dateOfWork.value
    let hours = form.hours.value
    let remainingHours = form.remainingHours.value

    let time = new Date()

    let timeStamp = time.toLocaleTimeString()

    let editCount = -1
    logs.forEach((data) => {
        editCount++
        if (data.id == globalId) {
            logs[editCount].workDesc = workDesc
            logs[editCount].dateOfWork = dateOfWork
            logs[editCount].hours = hours
            logs[editCount].remainingHours = remainingHours
            logs[editCount].timeStamp = timeStamp
            // editCount = -1
        }
    })

    console.log(logs)

    localStorage.setItem("logs", JSON.stringify(logs))

    location.reload()

    localStorage.removeItem("toggle")
    localStorage.removeItem("editId")
    localStorage.removeItem("editHours")

    reset(form)

}

document.getElementById("disp").innerHTML =
    "Welcome to the Dashboard " + username

function addFields(form) {

    let workDesc = form.workDescription.value
    let dateOfWork = form.dateOfWork.value
    let hours = form.hours.value
    let remainingHours = form.remainingHours.value

    if (workDesc && dateOfWork && hours &&
        remainingHours) {

        let time = new Date()

        let timeStamp = time.toLocaleTimeString()

        let id

        logs.forEach((data) => {
            id = data.id + 1
        })

        if (id == undefined) {
            id = 1
        }

        vals = addItems(username, workDesc, dateOfWork,
            hours, remainingHours, timeStamp, id)

        logs.push(vals)
        localStorage.setItem("logs", JSON.stringify(logs))

        let table = document.getElementById("tableBody");
        let len = document.getElementById("tableBody").rows.length;
        let row = table.insertRow(len);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        cell7.setAttribute("id", "edit")
        cell7.setAttribute("style", "cursor:pointer")
        cell7.setAttribute("onClick", "edit(" + id + ")")
        cell8.setAttribute("id", "edit")
        cell8.setAttribute("style", "cursor:pointer")
        cell8.setAttribute("onClick", "deleteLog(" + id + ")")
        cell1.innerHTML = id;
        cell2.innerHTML = workDesc;
        cell3.innerHTML = dateOfWork;
        cell4.innerHTML = hours;
        cell5.innerHTML = remainingHours;
        cell6.innerHTML = timeStamp;
        cell7.innerHTML = "Edit";
        cell8.innerHTML = "Delete";
    }

    reset(form)

}

// Adding User to the Local Storage
var addItems = function (username, workDesc, dateOfWork,
    hours, remainingHours, timeStamp, id) {


    let newItem = {
        'id': id,
        'username': username,
        'workDesc': workDesc,
        'dateOfWork': dateOfWork,
        'hours': hours,
        'remainingHours': remainingHours,
        'timeStamp': timeStamp
    }

    return newItem

}

function logout() {
    localStorage.removeItem("sessionToken")
    window.location.href = "login.html"
}


// Populating table logs for Admin users

checkAdmin(username)

function checkAdmin(username) {

    if (username == "Admin") {

        document.getElementById("username").style.display = "block";
        document.getElementById("fab").style.display = "none";

        let table = document.getElementById("tableBody");
        let populateFragment = document.createDocumentFragment();
        let cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8
        let row

        logs.forEach((data) => {
            row = document.createElement('tr')
            cell1 = document.createElement('td')
            cell2 = document.createElement('td')
            cell3 = document.createElement('td')
            cell4 = document.createElement('td')
            cell5 = document.createElement('td')
            cell6 = document.createElement('td')
            cell7 = document.createElement('td')
            cell1.innerHTML = data.id;
            cell2.innerHTML = data.username;
            cell3.innerHTML = data.workDesc;
            cell4.innerHTML = data.dateOfWork;
            cell5.innerHTML = data.hours;
            cell6.innerHTML = data.remainingHours;
            cell7.innerHTML = data.timeStamp;
            row.append(cell1)
            row.append(cell2)
            row.append(cell3)
            row.append(cell4)
            row.append(cell5)
            row.append(cell6)
            row.append(cell7)
            if (data.remainingHours == 0) {
                cell6.innerHTML = "Completely utilized 8 hours!"
                row.setAttribute("style", "color: darkgreen")
            }
            if (data.remainingHours < 0) {
                cell6.innerHTML = "Overtime : Extra " + Math.abs(data.remainingHours) + " hours";
                row.setAttribute("style", "color: red")
            }
            populateFragment.appendChild(row)
            console.log(populateFragment.appendChild(row))

        })
        table.appendChild(populateFragment);
    }
}

// Remaining hours calculation logic

function calculate() {

    var date = document.getElementById("date").value
    var hours = document.getElementById("hours").value

    if (localStorage.getItem("toggle") == "edit") {

        var prevRemain
        var editId = localStorage.getItem("editId")
        var editHours = hours
        var editCount = 0

        logs.forEach((data) => {
            if (data.dateOfWork == date && data.username == username) {
                if (editCount == 0) {
                    prevRemain = data.remainingHours
                }
                if (data.id == editId && data.dateOfWork == date && data.username == username) {
                    if (editCount == 0) {
                        data.remainingHours = 8 - editHours
                        prevRemain = data.remainingHours
                        data.hours = editHours
                        document.getElementById("remainingHours").value = data.remainingHours
                    } else {
                        data.remainingHours = prevRemain - editHours
                        prevRemain = data.remainingHours
                        data.hours = editHours
                        document.getElementById("remainingHours").value = data.remainingHours
                    }
                } else if (editCount != 0 && data.dateOfWork == date && data.username == username) {
                    data.remainingHours = prevRemain - data.hours
                    prevRemain = data.remainingHours
                }
                editCount++
            }
        })
    } else {

        if (logs.length == 0) {
            document.getElementById("remainingHours").value = 8 - hours
        }

        logs.forEach((data) => {
            if (username != data.username) {
                document.getElementById("remainingHours").value = 8 - hours
            }
        })

        editCount = 0
        if (date) {
            logs.forEach((data) => {
                if (data.dateOfWork == date && data.username == username) {
                    prevRemain = data.remainingHours
                }
                if (data.dateOfWork == date && data.username == username) {
                    console.log("yeyy")
                    var remainingHours = prevRemain
                    remainingHours = remainingHours - hours
                    document.getElementById("remainingHours").value = remainingHours
                    editCount++
                } else if (editCount == 0 && data.username == username) {
                    console.log("hohoho")
                    var remainingHours = data.remainingHours
                    remainingHours = 8 - hours
                    document.getElementById("remainingHours").value = remainingHours
                }
            })
        } else {
            alert("Enter a date first!!!")
        }
    }
}



// Table Sorting

var TableLastSortedColumn = -1;

function SortTable() {
    // alert("I'm Working")
    var sortColumn = parseInt(arguments[0]);
    var type = arguments.length > 1 ? arguments[1] : 'T';
    var dateformat = arguments.length > 2 ? arguments[2] : '';
    var table = document.getElementById("table");
    var tbody = table.getElementsByTagName("tbody")[0];
    console.log(tbody);
    var rows = tbody.getElementsByTagName("tr");
    var arrayOfRows = new Array();
    type = type.toUpperCase();
    console.log("Type : " + type)
    dateformat = dateformat.toLowerCase();
    console.log("DateFormat : " + dateformat)
    for (var i = 0, len = rows.length; i < len; i++) {
        arrayOfRows[i] = new Object;
        arrayOfRows[i].oldIndex = i;
        var celltext = rows[i].getElementsByTagName("td")[sortColumn].innerHTML.replace(/<[^>]*>/g, "");
        if (type == 'D') {
            arrayOfRows[i].value = GetDateSortingKey(dateformat, celltext);
        } else {
            var re = type == "N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
            arrayOfRows[i].value = celltext.replace(re, "").substr(0, 25).toLowerCase();
        }
    }
    if (sortColumn == TableLastSortedColumn) {
        arrayOfRows.reverse();
    } else {
        TableLastSortedColumn = sortColumn;
        switch (type) {
            case "N":
                arrayOfRows.sort(CompareRowOfNumbers);
                break;
            case "D":
                arrayOfRows.sort(CompareRowOfNumbers);
                break;
            default:
                arrayOfRows.sort(CompareRowOfText);
        }
    }
    var newTableBody = document.createElement("tbody");
    for (var i = 0, len = arrayOfRows.length; i < len; i++) {
        newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
    }
    table.replaceChild(newTableBody, tbody);
} // function SortTable()

function CompareRowOfText(a, b) {
    var aval = a.value;
    var bval = b.value;
    return (aval == bval ? 0 : (aval > bval ? 1 : -1));
} // function CompareRowOfText()

function CompareRowOfNumbers(a, b) {
    var aval = /\d/.test(a.value) ? parseFloat(a.value) : 0;
    var bval = /\d/.test(b.value) ? parseFloat(b.value) : 0;
    return (aval == bval ? 0 : (aval > bval ? 1 : -1));
} // function CompareRowOfNumbers()

function GetDateSortingKey(format, text) {
    if (format.length < 1) {
        return "";
    }
    format = format.toLowerCase();
    text = text.toLowerCase();
    text = text.replace(/^[^a-z0-9]*/, "");
    text = text.replace(/[^a-z0-9]*$/, "");
    if (text.length < 1) {
        return "";
    }
    text = text.replace(/[^a-z0-9]+/g, ",");
    var date = text.split(",");
    if (date.length < 3) {
        return "";
    }
    var d = 0,
        m = 0,
        y = 0;
    for (var i = 0; i < 3; i++) {
        var ts = format.substr(i, 1);
        if (ts == "d") {
            d = date[i];
        } else if (ts == "m") {
            m = date[i];
        } else if (ts == "y") {
            y = date[i];
        }
    }
    d = d.replace(/^0/, "");
    if (d < 10) {
        d = "0" + d;
    }
    if (/[a-z]/.test(m)) {
        m = m.substr(0, 3);
        switch (m) {
            case "jan":
                m = String(1);
                break;
            case "feb":
                m = String(2);
                break;
            case "mar":
                m = String(3);
                break;
            case "apr":
                m = String(4);
                break;
            case "may":
                m = String(5);
                break;
            case "jun":
                m = String(6);
                break;
            case "jul":
                m = String(7);
                break;
            case "aug":
                m = String(8);
                break;
            case "sep":
                m = String(9);
                break;
            case "oct":
                m = String(10);
                break;
            case "nov":
                m = String(11);
                break;
            case "dec":
                m = String(12);
                break;
            default:
                m = String(0);
        }
    }
    m = m.replace(/^0/, "");
    if (m < 10) {
        m = "0" + m;
    }
    y = parseInt(y);
    if (y < 100) {
        y = parseInt(y) + 2000;
    }
    return "" + String(y) + "" + String(m) + "" + String(d) + "";
}