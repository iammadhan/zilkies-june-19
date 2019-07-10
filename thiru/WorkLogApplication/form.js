window.onload = function() {
    fillDetails();
    createEventListener();
}

let sortDateStatus = 0;

function increment() {
    let counter;
    if (localStorage.getItem('counter') == null) {
        counter = 0;
    } else {
        counter = localStorage.getItem('counter');
    }

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

function validateHours(hours, workDate, userId) {
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    let flag = true;
    let remainingHours = 0;
    if (logInfo == null) {
        flag = true;
    } else {
        for (let index = 0; index < logInfo.length; index++) {
            if (logInfo[index]["userId"] == userId) {
                if (logInfo[index]["workDate"] == workDate) {
                    remainingHours = parseInt(logInfo[index]["remainingHours"]);
                    flag = false;
                }
            }
        }
    }
    // console.log("adding row");
    // console.log(remainingHours);
    if (remainingHours == 0 && flag == true) {
        remainingHours = 8 - hours;
        if (remainingHours < 0) {
            alert("Alert!!! Work Log time exceeding 8 hours")
        }
    } else if (flag == false && remainingHours == 0) {
        // alert("inside");
        remainingHours = 0 - hours;
    } else {
        remainingHours = remainingHours - hours;
        if (remainingHours < 0) {
            alert("Alert!!! Work Log time exceeding 8 hours")
        }
    }
    // console.log("remaining hours: " + remainingHours);
    return remainingHours;

    _

}

function validateInputs(hours) {
    let numbers = /^[0-9]+$/;
    if (numbers.test(hours)) {
        // document.getElementById("error").style.display = "none";
        return true;
    } else {
        // document.getElementById("error").style.display = "block";
        return false;
    }
}


function addRow() {

    let hours = document.getElementById("hours").value;
    let description = document.getElementById("description").value;
    let workDate = document.getElementById("work-date").value;
    let userName = localStorage.getItem('currentUserName');
    let userId = localStorage.getItem('currentUserId');


    if (hours.length == 0 || description.length == 0 || workDate.length == 0) {
        alert("All fields are required");

    } else if (userId == null || userName == null) {
        alert("Please Login to Log Work")
    } else {
        if (validateInputs(hours)) {
            incrementer();
            let remainingHours = validateHours(hours, workDate, userId);
            let table = document.getElementById("table");
            let entryNo = access();
            let userData = {
                "entryNo": entryNo,
                "userId": userId,
                "userName": userName,
                "hours": hours,
                "description": description,
                "workDate": workDate,
                "remainingHours": remainingHours,
                "timeStamp": Date.now()
            };
            let inputs = [entryNo, hours, description, workDate, remainingHours];

            let frag = document.createDocumentFragment();
            let row = document.createElement("tr");
            for (let i = 0; i < inputs.length; i++) {
                let data = document.createElement("td");
                data.innerText = inputs[i];
                data.value = inputs[i];
                row.appendChild(data);
                // console.log(data);
                // console.log(row);
            }
            data = document.createElement("td");
            let icon = document.createElement("i");
            icon.className = "fa fa-edit";
            let edit = document.createElement("button");
            edit.className = "edit";
            edit.id = "edit-" + access();
            edit.value = "Edit";
            edit.innerText = "Edit";
            edit.appendChild(icon);
            data.appendChild(edit);

            let save = document.createElement("button");
            icon = document.createElement("i");
            icon.className = "fa fa-save";
            save.className = "save";
            save.id = "save-" + access();
            save.value = "Save";
            save.innerText = "Save";
            save.style.display = "none";
            save.appendChild(icon);

            let cancel = document.createElement("button");
            icon = document.createElement("i");
            icon.className = "fa fa-window-close";
            cancel.className = "cancel";
            cancel.id = "cancel-" + access();
            cancel.value = "Cancel";
            cancel.innerText = "Cancel";
            cancel.style.display = "none";
            cancel.appendChild(icon);
            data.appendChild(cancel);

            row.appendChild(data);

            data = document.createElement("td");
            icon = document.createElement("i");
            icon.className = "fa fa-trash";
            let button = document.createElement("button");
            button.className = "delete";
            button.id = "delete-" + access();
            button.value = "Delete";
            button.innerText = "Delete";
            button.appendChild(icon);
            data.appendChild(button);
            row.appendChild(data);
            row.id = "row-" + access();

            frag.appendChild(row);
            // console.log(table.childNodes[1])
            table.appendChild(frag);
            localStorage.setItem("counter", access());
            storeRecord(userData);
            emptyInputs();
        }
        // console.log(table);
    }
}

function emptyInputs() {
    let input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
        input[i].value = "";
    }
    let textarea = document.getElementsByTagName("textarea")[0];
    textarea.value = "";
}

function createEventListener(element) {
    var element = document.getElementById("records");
    element.addEventListener("click", function(e) {
        console.log(e.target);
        if (e.target.className == 'delete' || e.target.className == 'fa fa-trash') {
            if (e.target.className == 'delete') {
                removeRow(e.target.parentNode.parentNode.id);
            } else {
                removeRow(e.target.parentNode.parentNode.parentNode.id);
            }

        }
        if (e.target.className == 'edit' || e.target.className == 'fa fa-edit') {
            if (e.target.className == 'edit') {
                editRow(e.target.parentNode.parentNode.id);
            } else {
                editRow(e.target.parentNode.parentNode.parentNode.id);
            }
        }
        if (e.target.className == 'save' || e.target.className == 'fa fa-save') {
            if (e.target.className == 'save') {
                saveRow(e.target.id);
            } else {
                saveRow(e.target.parentNode.id);
            }

        }
        if (e.target.className == 'cancel' || e.target.className == 'fa fa-window-close') {
            if (e.target.className == 'cancel') {
                cancelEdit(e.target.id);
            } else {
                cancelEdit(e.target.parentNode.id);
            }

        }
    });
}

function removeRow(id) {
    let table = document.getElementById("table");
    let row = document.getElementById(id);
    let entryNo = String(id).split("-")[1];
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    let position, workDate, userId, additionalHours;

    for (let index = 0; index < logInfo.length; index++) {
        console.log(logInfo[index]["entryNo"]);
        console.log(entryNo);
        if (entryNo == logInfo[index]["entryNo"]) {
            position = index;
            workDate = logInfo[index]["workDate"];
            userId = logInfo[index]["userId"];
            additionalHours = logInfo[index]["hours"];
            logInfo.splice(index, 1);
            break;
        }
    }

    localStorage.setItem("workLogs", JSON.stringify(logInfo));
    updateRemainingHours(position, workDate, userId, additionalHours, row, entryNo);
    table.removeChild(row);
}

function updateRemainingHours(position, workDate, userId, additionalHours, row, entryNo) {
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    for (let index = 0; index < logInfo.length; index++) {
        if (logInfo[index]["userId"] == userId) {
            if (logInfo[index]["workDate"] == workDate && logInfo[index]["entryNo"] > entryNo) {
                console.log(parseInt(logInfo[index]["remainingHours"]) + parseInt(additionalHours));
                logInfo[index]["remainingHours"] = parseInt(logInfo[index]["remainingHours"]) + parseInt(additionalHours);
                updateDomRow(logInfo[index]["entryNo"], logInfo[index]["remainingHours"]);
                console.log(logInfo[index]);
            }
        }
    }

    localStorage.setItem("workLogs", JSON.stringify(logInfo));
}

function updateDomRow(id, value) {
    let row = document.getElementById("row-" + id);
    row.childNodes[3].innerText = value;
}

function storeRecord(userData) {
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    // console.log(userData);
    if (logInfo == null) {
        let logs = [];
        logs.push(userData);
        localStorage.setItem("workLogs", JSON.stringify(logs));
    } else {
        logInfo.push(userData);
        localStorage.setItem("workLogs", JSON.stringify(logInfo));
    }
}

function editRow(id) {
    let entryNo = String(id).split("-")[1];
    document.getElementById("edit-" + entryNo).style.display = "none";
    document.getElementById("save-" + entryNo).style.display = "flex";
    document.getElementById("cancel-" + entryNo).style.display = "flex";
    document.getElementById("delete-" + entryNo).disabled = true;
    let table = document.getElementById("table");
    let row = document.getElementById(id);
    let rowData = row.childNodes;

    let hourInput = document.createElement("input");
    hourInput.value = String(rowData[0].value);
    hourInput.id = "edit-hour-" + entryNo;
    hourInput.className = "edit-input-" + entryNo;
    hourInput.type = "number";
    hourInput.min = "1";
    hourInput.max = "8";
    rowData[0].innerText = "";
    rowData[0].className = "edit-input-hour";
    rowData[0].appendChild(hourInput);

    let descriptionInput = document.createElement("textarea");
    descriptionInput.value = String(rowData[1].value);
    descriptionInput.id = "edit-description-" + entryNo;
    descriptionInput.className = "edit-input";
    descriptionInput.maxLength = "50";
    rowData[1].innerText = "";
    rowData[1].className = "edit-input";
    rowData[1].appendChild(descriptionInput);

    let dateInput = document.createElement("input");
    dateInput.value = String(rowData[2].value);
    dateInput.id = "edit-date-" + entryNo;
    dateInput.className = "edit-input-date";
    dateInput.type = "date";
    rowData[2].innerText = "";
    rowData[2].className = "edit-input-work-date";
    rowData[2].appendChild(dateInput);

}

function fillDetails() {
    let userName = localStorage.getItem('currentUserName');
    let userId = localStorage.getItem('currentUserId');
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    let table = document.getElementById("table");
    let frag = document.createDocumentFragment();
    if (userId != null && userName != null) {
        if (logInfo != null) {
            for (let index = 0; index < logInfo.length; index++) {
                if (logInfo[index]["userId"] == String(userId)) {
                    let inputs = [logInfo[index]["entryNo"], logInfo[index]["hours"], logInfo[index]["description"], logInfo[index]["workDate"], logInfo[index]["remainingHours"]];
                    console.log(inputs);
                    let entryNo = logInfo[index]["entryNo"];

                    let row = document.createElement("tr");

                    for (let i = 0; i < inputs.length; i++) {
                        let data = document.createElement("td");
                        data.innerText = inputs[i];
                        data.value = inputs[i];
                        row.appendChild(data);
                    }
                    data = document.createElement("td");
                    let icon = document.createElement("i");
                    icon.className = "fa fa-edit";
                    let edit = document.createElement("button");

                    edit.className = "edit";
                    edit.id = "edit-" + entryNo;
                    edit.value = "Edit";
                    edit.innerText = "Edit";
                    edit.appendChild(icon);
                    data.appendChild(edit);

                    let save = document.createElement("button");
                    icon = document.createElement("i");
                    icon.className = "fa fa-save";
                    save.className = "save";
                    save.id = "save-" + entryNo;
                    save.value = "Save";
                    save.innerText = "Save";
                    save.style.display = "none";
                    save.appendChild(icon);
                    data.appendChild(save);

                    let cancel = document.createElement("button");
                    icon = document.createElement("i");
                    icon.className = "fa fa-window-close";
                    cancel.className = "cancel";
                    cancel.id = "cancel-" + entryNo;
                    cancel.value = "Cancel";
                    cancel.innerText = "Cancel";
                    cancel.style.display = "none";
                    cancel.appendChild(icon);
                    data.appendChild(cancel);

                    row.appendChild(data);

                    data = document.createElement("td");
                    icon = document.createElement("i");
                    icon.className = "fa fa-trash";
                    let button = document.createElement("button");
                    button.className = "delete";
                    button.id = "delete-" + entryNo;
                    button.value = "Delete";
                    button.innerText = "Delete";
                    button.appendChild(icon);
                    data.appendChild(button);
                    row.appendChild(data);
                    row.id = "row-" + entryNo;

                    frag.appendChild(row);
                }
            }
            table.appendChild(frag);
        }
    } else {
        alert("Please Login to log work");
        location.href = "login.html";
    }

}

function remainingHoursOnEdit(entryNo, oldDate, workDate, userId) {
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    let remainingHours = 0;
    if (oldDate == workDate) {
        for (let index = 0; index < logInfo.length; index++) {
            if (logInfo[index]["entryNo"] == entryNo) {
                break;
            } else if (logInfo[index]["entryNo"] != entryNo) {
                if (logInfo[index]["userId"] == userId) {
                    if (logInfo[index]["workDate"] == workDate) {
                        remainingHours = parseInt(logInfo[index]["remainingHours"]);
                    }
                }
            }
        }

    } else {
        for (let index = 0; index < logInfo.length; index++) {
            if (logInfo[index]["userId"] == userId) {
                if (logInfo[index]["workDate"] == workDate) {
                    remainingHours = parseInt(logInfo[index]["remainingHours"]);
                }
            }
        }
    }
    if (remainingHours == 0) {
        return 8;
    } else {
        return remainingHours;
    }
}

function saveRow(id) {
    let entryNo = String(id).split("-")[1];
    let hours = document.getElementById("edit-hour-" + entryNo).value;
    let description = document.getElementById("edit-description-" + entryNo).value;
    let date = document.getElementById("edit-date-" + entryNo).value;
    let userId = localStorage.getItem('currentUserId');
    let flag = false;
    let oldDate;
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    for (let index = 0; index < logInfo.length; index++) {
        // console.log(logInfo[index]["entryNo"]);
        // console.log(entryNo);
        if (entryNo == logInfo[index]["entryNo"]) {
            difference = parseInt(logInfo[index]['hours']) - parseInt(hours);
            logInfo[index]['hours'] = hours;

            logInfo[index]['description'] = description;
            oldDate = logInfo[index]['workDate'];
            logInfo[index]['workDate'] = date;
            let prevRemainingHours = remainingHoursOnEdit(entryNo, oldDate, date, userId);
            remainingHours = prevRemainingHours - hours;

            // console.log(rem);
            logInfo[index]['remainingHours'] = remainingHours;
            logInfo[index]["timeStamp"] = Date.now();
            document.getElementById("row-" + entryNo).childNodes[3].innerText = remainingHours;
            break;
        }
    }
    localStorage.setItem("workLogs", JSON.stringify(logInfo));
    updateWorkLogRemainingHours(userId, date, oldDate, difference, entryNo);
    document.getElementById("edit-" + entryNo).style.display = "flex";
    document.getElementById("save-" + entryNo).style.display = "none";
    document.getElementById("cancel-" + entryNo).style.display = "none";
    document.getElementById("delete-" + entryNo).disabled = false;

    let row = document.getElementById("row-" + entryNo);
    let rowData = row.childNodes;
    // console.log(row);
    // console.log(rowData);
    rowData[0].removeChild(document.getElementById("edit-hour-" + entryNo));
    rowData[0].innerText = hours;
    rowData[0].value = hours;
    rowData[0].className = "";
    // console.log("edit-hour-" + entryNo);
    rowData[1].removeChild(document.getElementById("edit-description-" + entryNo));
    rowData[1].innerText = description;
    rowData[1].value = description;
    rowData[1].className = "";
    rowData[2].removeChild(document.getElementById("edit-date-" + entryNo));
    rowData[2].innerText = date;
    rowData[2].value = date;
    rowData[2].className = "";


}

function updateWorkLogRemainingHours(userId, date, oldDate, difference, entryNo) {
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    if (oldDate == date) {
        for (let index = 0; index < logInfo.length; index++) {
            if (logInfo[index]["userId"] == userId) {
                if (logInfo[index]["workDate"] == date) {
                    if (logInfo[index]["entryNo"] > entryNo) {
                        logInfo[index]["remainingHours"] = logInfo[index]["remainingHours"] + difference;
                        updateDomRow(logInfo[index]["entryNo"], logInfo[index]["remainingHours"]);
                    }
                }
            }
        }
        localStorage.setItem("workLogs", JSON.stringify(logInfo));
    } else {
        let prevRemainingHours = remainingHoursOnEdit(entryNo, oldDate, oldDate, userId);
        for (let index = 0; index < logInfo.length; index++) {
            if (logInfo[index]["userId"] == userId) {
                if (logInfo[index]["workDate"] == oldDate) {
                    logInfo[index]["remainingHours"] = prevRemainingHours - logInfo[index]["hours"];
                    prevRemainingHours = prevRemainingHours - logInfo[index]["hours"];
                    // logInfo[index]["timeStamp"] = Date.now();
                    updateDomRow(logInfo[index]["entryNo"], logInfo[index]["remainingHours"]);
                }
            }
        }
        localStorage.setItem("workLogs", JSON.stringify(logInfo));
        createNewLogInfo(entryNo, userId);
        // console.log(prevRemainingHours);
    }
}

function createNewLogInfo(entryNo, userId) {
    console.log(entryNo);
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    let userData;
    let inputs;
    for (let index = 0; index < logInfo.length; index++) {
        if (logInfo[index]["entryNo"] == entryNo) {
            incrementer();
            userData = {
                "entryNo": access(),
                "userId": userId,
                "userName": logInfo[index]["userName"],
                "hours": logInfo[index]["hours"],
                "description": logInfo[index]["description"],
                "workDate": logInfo[index]["workDate"],
                "remainingHours": logInfo[index]["remainingHours"],
                "timeStamp": Date.now()
            };
            inputs = [access(), logInfo[index]["hours"], logInfo[index]["description"], logInfo[index]["workDate"], logInfo[index]["remainingHours"]];
            logInfo.splice(index, 1);
            break;

        }
    }
    logInfo.push(userData);
    console.log(userData);
    localStorage.setItem("workLogs", JSON.stringify(logInfo));
    localStorage.setItem("counter", access());
    let table = document.getElementById("table");
    console.log(document.getElementById("row-") + entryNo);
    table.removeChild(document.getElementById("row-" + entryNo));


    let frag = document.createDocumentFragment();
    let row = document.createElement("tr");
    entryNo = access();
    for (let i = 0; i < inputs.length; i++) {
        let data = document.createElement("td");
        data.innerText = inputs[i];
        data.value = inputs[i];
        row.appendChild(data);
    }
    data = document.createElement("td");
    let icon = document.createElement("i");
    icon.className = "fa fa-edit";
    let edit = document.createElement("button");

    edit.className = "edit";
    edit.id = "edit-" + entryNo;
    edit.value = "Edit";
    edit.innerText = "Edit";
    edit.appendChild(icon);
    data.appendChild(edit);

    let save = document.createElement("button");
    icon = document.createElement("i");
    icon.className = "fa fa-save";
    save.className = "save";
    save.id = "save-" + entryNo;
    save.value = "Save";
    save.innerText = "Save";
    save.style.display = "none";
    save.appendChild(icon);
    data.appendChild(save);

    let cancel = document.createElement("button");
    icon = document.createElement("i");
    icon.className = "fa fa-window-close";
    cancel.className = "cancel";
    cancel.id = "cancel-" + entryNo;
    cancel.value = "Cancel";
    cancel.innerText = "Cancel";
    cancel.style.display = "none";
    cancel.appendChild(icon);
    data.appendChild(cancel);

    row.appendChild(data);

    data = document.createElement("td");
    icon = document.createElement("i");
    icon.className = "fa fa-trash";
    let button = document.createElement("button");
    button.className = "delete";
    button.id = "delete-" + entryNo;
    button.value = "Delete";
    button.innerText = "Delete";
    button.appendChild(icon);
    data.appendChild(button);
    row.appendChild(data);
    row.id = "row-" + entryNo;

    frag.appendChild(row);

    table.appendChild(frag);

}

function logout() {

    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserName');
    location.href = "login.html";
}

function cancelEdit(id) {
    let entryNo = String(id).split("-")[1];
    document.getElementById("edit-" + entryNo).style.display = "flex";
    document.getElementById("save-" + entryNo).style.display = "none";
    document.getElementById("cancel-" + entryNo).style.display = "none";
    document.getElementById("delete-" + entryNo).disabled = false;

    let row = document.getElementById("row-" + entryNo);
    let rowData = row.childNodes;
    // console.log(row);
    // console.log(rowData);
    rowData[0].removeChild(document.getElementById("edit-hour-" + entryNo));
    rowData[0].innerText = rowData[0].value;
    rowData[0].value = rowData[0].value;
    rowData[0].className = "";
    // console.log("edit-hour-" + entryNo);
    rowData[1].removeChild(document.getElementById("edit-description-" + entryNo));
    rowData[1].innerText = rowData[1].value;
    rowData[1].value = rowData[1].value;
    rowData[1].className = "";
    rowData[2].removeChild(document.getElementById("edit-date-" + entryNo));
    rowData[2].innerText = rowData[2].value;
    rowData[2].value = rowData[2].value;
    rowData[2].className = "";


}

function clearError() {
    let numbers = /^[0-9]+$/;
    hours = document.getElementById("hours").value;
    if (hours.length == 0) {
        document.getElementById("error").style.display = "none";
    } else {
        // hours = parseInt(hours);
        if (numbers.test(hours)) {
            document.getElementById("error").style.display = "none";
        } else {
            document.getElementById("error").style.display = "block";
        }
    }
}