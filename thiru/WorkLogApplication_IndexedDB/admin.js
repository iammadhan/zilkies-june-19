(function() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        return;
    }
})();

window.onload = function() {
    fillDetails();
    // createEventListener();
}

let sortIdStatus = 0;
let sortDateStatus = 0;
let workLog = [];


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
        let userId = null;
        let userName = null;

        let user = store.getAll();
        user.onsuccess = function() {
            userId = user.result[0]["userId"];
            userName = user.result[0]["userName"];
            tx = db.transaction("WorkLog", "readonly");
            store = tx.objectStore("WorkLog");
            if (userId.length > 0 && userName.length > 0) {
                let table = document.getElementById("table");
                let frag = document.createDocumentFragment();

                store.openCursor().onsuccess = function(event) {
                    let cursor = event.target.result;
                    let highlight;
                    if (cursor) {
                        console.log(userId, userName, cursor.value);
                        let logInfo = cursor.value;
                        workLog.push(logInfo);
                        if (parseInt(logInfo["remainingHours"]) < 0) {
                            highlight = true;
                        }
                        let inputs = [logInfo["userId"], logInfo["userName"], logInfo["hours"], logInfo["description"], logInfo["workDate"], logInfo["remainingHours"]];
                        let entryNo = logInfo["entryNo"];
                        let row = document.createElement("tr");
                        for (let i = 0; i < inputs.length; i++) {
                            let data = document.createElement("td");
                            data.innerText = inputs[i];
                            data.value = inputs[i];
                            row.appendChild(data);
                        }
                        if (highlight == true) {
                            row.style.backgroundColor = "#b4f9d9";
                        }
                        row.id = "row-" + entryNo;
                        row.className = "table-row";
                        frag.appendChild(row);
                        cursor.continue();
                    } else {
                        table.appendChild(frag);
                    }
                }

            } else {
                alert("Please Log In");
                location.href = "login.html";

            }
        }

    }
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

function sortById() {
    let table, rows, switching, i, x, y, shouldSwitch;
    let icon = document.querySelector(".header-id i");
    icon.style.display = "inline"
    if (sortIdStatus == 0) {
        sortIdStatus = 1;
        icon.className = "fa fa-sort-up";
        icon.style.verticalAlign = "bottom";
    } else if (sortIdStatus == 1) {
        sortIdStatus = 0;
        icon.className = "fa fa-sort-down";
        icon.style.verticalAlign = "top";
    }
    table = document.getElementById("table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            // console.log("x" + x.innerHTML);
            // console.log("y" + y.innerHTML);

            if (sortIdStatus) {
                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {

                    shouldSwitch = true;
                    break;
                }
            } else {
                if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {

                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

}

function sortByDate() {
    let table, rows, switching, i, x, y, shouldSwitch, flag;
    let icon = document.querySelector(".header-date i");
    icon.style.display = "inline"
    if (sortDateStatus == 0) {
        sortDateStatus = 1;
        icon.className = "fa fa-sort-up";
        icon.style.verticalAlign = "bottom";
    } else if (sortDateStatus == 1) {
        sortDateStatus = 0;
        icon.className = "fa fa-sort-down";
        icon.style.verticalAlign = "top";
    }
    table = document.getElementById("table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = getTimeStamp(rows[i].id);
            y = getTimeStamp(rows[i + 1].id);
            console.log(x, y);

            if (sortDateStatus) {
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

}

function getTimeStamp(id) {
    console.log(workLog);
    let entryNo = String(id).split("-")[1];
    let logInfo = workLog;
    for (let index = 0; index < logInfo.length; index++) {
        console.log(logInfo[index]);
        if (logInfo[index]["entryNo"] == entryNo) {
            return logInfo[index]["timeStamp"];
        }
    }
}