window.onload = function() {
    fillDetails();
    // createEventListener();
}

let sortIdStatus = 0;
let sortDateStatus = 0;


function fillDetails() {
    let userName = localStorage.getItem('currentUserName');
    let userId = localStorage.getItem('currentUserId');
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    let table = document.getElementById("table");
    let frag = document.createDocumentFragment();
    let highlight = false;
    if (userId != null && userName != null) {
        if (logInfo != null) {
            for (let index = logInfo.length - 1; index >= 0; index--) {
                highlight = false;
                let inputs = [logInfo[index]["userId"], logInfo[index]["userName"], logInfo[index]["hours"], logInfo[index]["description"], logInfo[index]["workDate"], logInfo[index]["remainingHours"]];
                if (parseInt(logInfo[index]["remainingHours"]) < 0) {
                    highlight = true;
                }
                let entryNo = logInfo[index]["entryNo"];

                let row = document.createElement("tr");
                if (highlight == true) {
                    row.style.backgroundColor = "#b4f9d9";
                }
                for (let i = 0; i < inputs.length; i++) {
                    let data = document.createElement("td");
                    data.innerText = inputs[i];
                    data.value = inputs[i];
                    row.appendChild(data);
                }
                row.id = "row-" + entryNo;
                row.className = "table-row";

                frag.appendChild(row);
            }

            table.appendChild(frag);
        }
    } else {
        alert("Please Login to log work");
        location.href = "login.html";
    }

}

function logout() {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserName');
    location.href = "login.html";
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
    let entryNo = String(id).split("-")[1];
    let logInfo = JSON.parse(localStorage.getItem('workLogs'));
    for (let index = 0; index < logInfo.length; index++) {
        if (logInfo[index]["entryNo"] == entryNo) {
            return logInfo[index]["timeStamp"];
        }
    }
}