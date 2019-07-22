(function() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        return;
    }
})();

window.onload = function() {
    fillDetails();
    createEventListener();
}

let sortDateStatus = 0;
// let userId, userName;

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

function validateHoursandInsert(hours, workDate, userId, hours, description, userName) {
    let request = window.indexedDB.open("WorkLog", 2),
        db, store, tx;

    request.onerror = function(event) {
        console.log("Error :" + event.target.error);
    }

    request.onsuccess = function(event) {
        db = request.result;

        tx = db.transaction("WorkLog", "readonly");
        store = tx.objectStore("WorkLog");
        let flag = true;
        let remainingHours = 0;
        let countRequest = store.count();
        countRequest.onsuccess = function() {
            if (countRequest.result > 0) {
                store.openCursor().onsuccess = function(event) {
                    cursor = event.target.result;
                    if (cursor) {
                        logInfo = cursor.value;
                        console.log(logInfo["entryNo"], logInfo["remainingHours"], logInfo["workDate"], workDate);
                        if (parseInt(logInfo["userId"]) == parseInt(userId) && logInfo["workDate"] == workDate) {
                            remainingHours = logInfo["remainingHours"];
                            console.log(remainingHours);
                            flag = false;
                        }
                        cursor.continue();
                    } else {
                        console.log("outside:" + remainingHours);
                        if (remainingHours == 0 && flag == true) {
                            remainingHours = 8 - hours;
                            if (remainingHours < 0) {
                                alert("Alert!!! Work Log time exceeding 8 hours")
                            }
                        } else if (flag == false && remainingHours == 0) {
                            remainingHours = 0 - hours;
                        } else {
                            remainingHours = remainingHours - hours;
                            if (remainingHours < 0) {
                                alert("Alert!!! Work Log time exceeding 8 hours")
                            }
                        }

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
                        console.log("inside");
                        let inputs = [hours, description, workDate, remainingHours];

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
                        data.appendChild(save);

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
                }
            } else {
                flag = true;
                remainingHours = 8 - hours;
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
                console.log("inside 1 content");
                let inputs = [hours, description, workDate, remainingHours];

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
                data.appendChild(save);

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

        }
    }
}


function validateInputs(hours) {
    let numbers = /^[0-9]+$/;
    if (numbers.test(hours)) {
        return true;
    } else {
        return false;
    }
}

function clearError() {
    let numbers = /^[0-9]+$/;
    hours = document.getElementById("hours").value;
    if (hours.length == 0) {
        document.getElementById("error").style.display = "none";
    } else {
        if (numbers.test(hours)) {
            document.getElementById("error").style.display = "none";
        } else {
            document.getElementById("error").style.display = "block";
        }
    }
}



function addRow() {

    let hours = document.getElementById("hours").value;
    let description = document.getElementById("description").value;
    let workDate = document.getElementById("work-date").value;
    let userId, userName;

    let request = window.indexedDB.open("WorkLog", 2),
        db, store, tx;

    request.onerror = function(event) {
        console.log("Error :" + event.target.error);
    }

    request.onsuccess = function(event) {
        db = request.result;
        tx = db.transaction("currentUser", "readonly");
        store = tx.objectStore("currentUser");

        let user = store.getAll();
        user.onsuccess = function() {
            userId = user.result[0]["userId"];
            userName = user.result[0]["userName"];
            console.log(userId, userName);
            if (hours.length == 0 || description.length == 0 || workDate.length == 0) {
                alert("All fields are required");

            } else if (userId == null || userName == null) {
                alert("Please Login to Log Work")
            } else {
                if (validateInputs(hours)) {
                    incrementer();

                    validateHoursandInsert(hours, workDate, userId, hours, description, userName);
                }
            }

        }
        tx.oncomplete = function() {
            db.close;
        }

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

function storeRecord(userData) {
    let request = window.indexedDB.open("WorkLog", 2),
        db, store, tx;


    request.onupgradeneeded = function(e) {
        let db = request.result,
            store = db.createObjectStore("WorkLog", { keyPath: "entryNo" }),
            index = store.createIndex("userId", "userId", { unique: false });

    }
    request.onerror = function(event) {
        console.log("Error :" + event.target.error);
    }

    request.onsuccess = function(event) {
        db = request.result;
        tx = db.transaction("WorkLog", "readwrite");
        store = tx.objectStore("WorkLog");
        store.put(userData);
        tx.oncomplete = function() {
            db.close;
        }
    }
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

function fillDetails() {
    let request = window.indexedDB.open("WorkLog", 2),
        db, store, tx;

    request.onerror = function(event) {
        console.log("Error :" + event.target.error);
    }

    request.onsuccess = function(event) {
        db = request.result;

        tx = db.transaction("currentUser", "readonly");
        store = tx.objectStore("currentUser");

        let user = store.getAll();
        user.onsuccess = function() {
            userId = user.result[0]["userId"];
            userName = user.result[0]["userName"];
            tx = db.transaction("WorkLog", "readonly");
            store = tx.objectStore("WorkLog");
            let table = document.getElementById("table");
            let frag = document.createDocumentFragment();

            store.openCursor().onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor) {
                    console.log(userId, userName, cursor.value);
                    let logInfo = cursor.value;
                    if (userId != null && userName != null) {
                        if (logInfo != null) {
                            if (logInfo["userId"] == userId) {
                                let inputs = [logInfo["hours"], logInfo["description"], logInfo["workDate"], logInfo["remainingHours"]];
                                let entryNo = logInfo["entryNo"];
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
                                table.appendChild(frag);
                            }
                        }
                        cursor.continue();
                    }
                }
            }
        }
        tx.oncomplete = function() {
            db.close;
        }
    }
}

function removeRow(id) {
    let entryNo = String(id).split("-")[1];
    let request = window.indexedDB.open("WorkLog", 2),
        db, store, tx;

    request.onerror = function(event) {
        console.log("Error :" + event.target.error);
    }

    request.onsuccess = function(event) {
        db = request.result;

        tx = db.transaction("WorkLog", "readwrite");
        store = tx.objectStore("WorkLog");
        let table = document.getElementById("table");
        let row = document.getElementById(id);

        store.openCursor().onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                logInfo = cursor.value;
                if (entryNo == logInfo['entryNo']) {
                    let userId = logInfo['userId'];
                    let workDate = logInfo['workDate'];
                    let additionalHours = logInfo['hours'];
                    objectDelete = store.delete(parseInt(entryNo));
                    objectDelete.onsuccess = function() {
                        console.log(objectDelete);
                        updateRemainingHours(entryNo, userId, workDate, additionalHours);
                    }
                    table.removeChild(row);
                }
                cursor.continue();
            }

        }
    }
}

function updateRemainingHours(entryNo, userId, workDate, additionalHours) {
    let request = window.indexedDB.open("WorkLog", 2),
        db, store, tx;

    request.onerror = function(event) {
        console.log("Error :" + event.target.error);
    }

    request.onsuccess = function(event) {
        db = request.result;

        tx = db.transaction("WorkLog", "readwrite");
        store = tx.objectStore("WorkLog");

        store.openCursor().onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                logInfo = cursor.value;
                console.log(logInfo);
                if (logInfo["userId"] == userId) {
                    console.log(logInfo["workDate"], logInfo["entryNo"]);
                    if (logInfo["workDate"] == workDate && logInfo["entryNo"] > entryNo) {
                        console.log(parseInt(logInfo["remainingHours"]) + parseInt(additionalHours));
                        logInfo["remainingHours"] = parseInt(logInfo["remainingHours"]) + parseInt(additionalHours);
                        store.put(logInfo);
                        updateDomRow(logInfo["entryNo"], logInfo["remainingHours"]);
                        // console.log(logInfo[index]);
                    }
                }
                cursor.continue();
            }
        }
    }
}

function updateDomRow(id, value) {
    let row = document.getElementById("row-" + id);
    row.childNodes[3].innerText = value;
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


function saveRow(id) {
    let entryNo = String(id).split("-")[1];
    let hours = document.getElementById("edit-hour-" + entryNo).value;
    let description = document.getElementById("edit-description-" + entryNo).value;
    let date = document.getElementById("edit-date-" + entryNo).value;
    let userId = localStorage.getItem('currentUserId');
    let flag = false;
    let oldDate;
    let request = window.indexedDB.open("WorkLog", 2),
        db, store, tx;

    request.onerror = function(event) {
        console.log("Error :" + event.target.error);
    }

    request.onsuccess = function(event) {
            db = request.result;

            tx = db.transaction("WorkLog", "readwrite");
            store = tx.objectStore("WorkLog");
            let table = document.getElementById("table");
            let row = document.getElementById(id);
            let rowtoEdit;
            let remainingHours = 0;
            let flag = true;

            store.openCursor().onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor) {
                    //update the date,workDate and description here. 
                    //Calculate the difference and if the date is same or has it been modified
                    logInfo = cursor.value;
                    if (logInfo['entryNo'] == entryNo) {
                        difference = logInfo["hours"] - hours;
                        oldDate = logInfo["workDate"];
                        logInfo["hours"] = hours;
                        logInfo["description"] = description;
                        logInfo["workDate"] = date;
                        oldRemainingHours = logInfo["hours"];
                        oldEntryNo = logInfo["entryNo"];
                        rowtoEdit = logInfo;
                        store.put(logInfo);
                    }
                    cursor.continue();
                } else {
                    //fisrt calculate the remaininghours for the edited entry based on date.
                    console.log("hello");
                    console.log(oldDate);
                    console.log(difference);
                    console.log(rowtoEdit);
                    if (oldDate == date) {
                        let flag = true;
                        let remainingHours = 0;
                        store.openCursor().onsuccess = function(event) {
                            let cursor = event.target.result;
                            if (cursor) {
                                logInfo = cursor.value;
                                if (logInfo['entryNo'] < entryNo && logInfo["workDate"] == date) {
                                    remainingHours = logInfo["remainingHours"];
                                    flag = false;
                                }
                                cursor.continue();
                            } else {
                                if (remainingHours == 0 && flag == true) {
                                    remainingHours = 8;
                                }
                                //update the remaining hours and update the other dependent records for the same day
                                console.log(remainingHours);
                                rowtoEdit["remainingHours"] = remainingHours - rowtoEdit["hours"];
                                console.log(rowtoEdit);
                                store.put(rowtoEdit);
                                updateDomRow(rowtoEdit["entryNo"], rowtoEdit["remainingHours"]);
                                store.openCursor().onsuccess = function(event) {
                                    let cursor = event.target.result;
                                    if (cursor) {
                                        logInfo = cursor.value;
                                        if (logInfo['entryNo'] > entryNo && logInfo["workDate"] == date) {
                                            logInfo["remainingHours"] = logInfo["remainingHours"] + difference;
                                            store.put(logInfo);
                                            updateDomRow(logInfo["entryNo"], logInfo["remainingHours"]);
                                        }
                                        cursor.continue();
                                    }
                                }

                            }
                        }
                    } else {
                        console.log(entryNo);
                        let flag = true;
                        let remainingHours = 0;
                        store.openCursor().onsuccess = function(event) {
                            let cursor = event.target.result;
                            if (cursor) {
                                logInfo = cursor.value;
                                if (logInfo["workDate"] == date && logInfo["entryNo"] != entryNo) {
                                    remainingHours = logInfo["remainingHours"];
                                    console.log(logInfo["entryNo"]);
                                    flag = false;
                                }
                                cursor.continue();
                            } else {
                                if (remainingHours == 0 && flag == true) {
                                    remainingHours = 8;
                                }
                                console.log("-eomee-ekmeomoemme-----");
                                console.log(remainingHours);
                                console.log(rowtoEdit["workDate"]);
                                rowtoEdit["remainingHours"] = remainingHours - rowtoEdit["hours"];
                                console.log(rowtoEdit);
                                store.put(rowtoEdit);
                                updateDomRow(rowtoEdit["entryNo"], rowtoEdit["remainingHours"]);
                                createNewLogInfo(rowtoEdit);
                                store.openCursor.onsuccess = function(event) {
                                    let cursor = event.target.result;
                                    if (cursor) {
                                        logInfo = cursor.value;
                                        if (logInfo["workDate"] == oldDate && logInfo["entryNo"] > oldEntryNo) {
                                            console.log(logInfo);
                                            console.log(oldEntryNo);
                                            logInfo["remainingHours"] = logInfo["remainingHours"] + oldRemainingHours;
                                            store.put(logInfo);
                                        }
                                        cursor.continue();
                                    }
                                }
                            }
                        }

                    }

                }
            }
        }
        // updateWorkLogRemainingHours(userId, date, oldDate, difference, entryNo);
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

function cancelEdit(id) {
    let entryNo = String(id).split("-")[1];
    document.getElementById("edit-" + entryNo).style.display = "flex";
    document.getElementById("save-" + entryNo).style.display = "none";
    document.getElementById("cancel-" + entryNo).style.display = "none";
    document.getElementById("delete-" + entryNo).disabled = false;

    let row = document.getElementById("row-" + entryNo);
    let rowData = row.childNodes;

    rowData[0].removeChild(document.getElementById("edit-hour-" + entryNo));
    rowData[0].innerText = rowData[0].value;
    rowData[0].value = rowData[0].value;
    rowData[0].className = "";
    rowData[1].removeChild(document.getElementById("edit-description-" + entryNo));
    rowData[1].innerText = rowData[1].value;
    rowData[1].value = rowData[1].value;
    rowData[1].className = "";
    rowData[2].removeChild(document.getElementById("edit-date-" + entryNo));
    rowData[2].innerText = rowData[2].value;
    rowData[2].value = rowData[2].value;
    rowData[2].className = "";
}

function createNewLogInfo(logInfo) {
    let entryNo = logInfo["entryNo"];
    let userData;
    let inputs;
    incrementer();
    userData = {
        "entryNo": access(),
        "userId": logInfo["userId"],
        "userName": logInfo["userName"],
        "hours": logInfo["hours"],
        "description": logInfo["description"],
        "workDate": logInfo["workDate"],
        "remainingHours": logInfo["remainingHours"],
        "timeStamp": Date.now()
    };
    inputs = [logInfo["hours"], logInfo["description"], logInfo["workDate"], logInfo["remainingHours"]];
    let request = window.indexedDB.open("WorkLog", 2),
        db, store, tx;

    request.onerror = function(event) {
        console.log("Error :" + event.target.error);
    }

    request.onsuccess = function(event) {
        db = request.result;

        tx = db.transaction("WorkLog", "readwrite");
        store = tx.objectStore("WorkLog");
        objectDelete = store.delete(parseInt(logInfo["entryNo"]));
        objectDelete.onsuccess = function() {
            console.log("deleted");
        }
        store.put(userData);
    }


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
    let request = window.indexedDB.open("WorkLog", 2),
        db, store, index, tx, store2, tx2;

    request.onerror = function(event) {
        console.log("Error :" + event.target.error);
    }

    request.onsuccess = function(event) {
        db = request.result;
        tx = db.transaction("currentUser", "readwrite");
        store = tx.objectStore("currentUser");
        store.clear();
        location.href = "login.html";

        tx.oncomplete = function() {
            db.close;
        };

    }


}