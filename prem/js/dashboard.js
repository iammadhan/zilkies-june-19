
var db = openDatabase('Worklog', '1.0', 'Worklog DB', 2 * 1024 * 1024);

document.getElementById("greet").innerHTML = "Welcome " + sessionStorage.getItem("name");

var len = 0;

var rowSubIndex;

var workInAffectedRows = [];
var logInAffectedRows = [];
var hourInAffectedRows = [];
var remainingHourInAffectedRows = [];


var clearSession = function () {
    sessionStorage.clear();
}

var insertEntry = function () {
    let work = document.getElementById("work").value;
    let date = document.getElementById("date").value;
    let hour = document.getElementById("hour").value;
    let userid = sessionStorage.getItem("uid");
    let name = sessionStorage.getItem("name");
    let createdTimestamp = new Date().toLocaleString();
    var remHour = 0;
    let logid = ++len;


    db.transaction(function (tx) {
        tx.executeSql('SELECT hour FROM INDIVIDUAL WHERE(uid=' + userid + ' AND date="' + date + '")', [], function (tx, results) {
            if (results.rows.length > 0) {
                var totalWork = 0;
                for (var i = 0; i < results.rows.length; i++) {
                    var work = Number(results.rows.item(i).hour);
                    totalWork = totalWork + work;
                    console.log(totalWork);
                }
                totalWork = totalWork + Number(hour);
                remHour = 8 - totalWork;
            }
            else {
                remHour = 8 - hour;
            }
        });
    });

    db.transaction(function (tx) {
        tx.executeSql('insert into INDIVIDUAL(uid, name, logid, work, date, hour, remaininghour,createdTimestamp,updatedTimestamp ) values(' + userid + ',"' +
            name + '","' + logid + '","' + work + '","' + date + '","' + hour + '","' + remHour + '","' + createdTimestamp + '","' + createdTimestamp + '")');
    });

    console.log("Entry successful");

    setTimeout(addRow, 400);

    function addRow() {
        let user = document.querySelectorAll(".user");
        let table = document.getElementById("myTable");
        let row = table.insertRow();
        let cell = row.insertCell(0);
        cell.innerHTML = len;

        for (let i = 0; i < user.length; i++) {
            user[i].value = "";
        }

        cell = row.insertCell(1);
        cell.innerHTML = work;
        cell = row.insertCell(2);
        cell.innerHTML = date;
        cell = row.insertCell(3);
        cell.innerHTML = hour;
        cell = row.insertCell(4);
        if (remHour < 0) {
            row.style.backgroundColor = "red";
            var temp = remHour * -1;
            cell.innerHTML = "OT ( " + temp + " )";
        }
        else {
            cell.innerHTML = remHour;
        }


        cell = row.insertCell(5);
        var btn = document.createElement("BUTTON");
        btn.innerHTML = "Edit";
        btn.setAttribute("class", "edit");
        btn.onclick = editRow;
        cell.appendChild(btn);

        cell = row.insertCell(6);
        var deletebtn = document.createElement("BUTTON");
        deletebtn.innerHTML = "Delete";
        deletebtn.setAttribute("class", "delete");
        deletebtn.onclick = deleteRow;
        cell.appendChild(deletebtn);


    }

    document.getElementById("data-form").style.display = "none";
    document.getElementById("submit").style.display = "none";

}

var displayEntries = function () {
    let userid = sessionStorage.getItem("uid");
    let table = document.getElementById("myTable");

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM INDIVIDUAL", [], function (tx, results) {
            if (results.rows.length > 0) {
                len = results.rows.length;
            }
        });
    });

    db.transaction(function (tx) {
        tx.executeSql('SELECT logid,work,date,hour,remaininghour FROM INDIVIDUAL WHERE(uid=' + userid + ')', [], function (tx, results) {
            if (results.rows.length > 0) {
                for (var i = 0; i < results.rows.length; i++) {
                    let row = table.insertRow();
                    let cell = row.insertCell(0);
                    cell.innerHTML = results.rows.item(i).logid;

                    cell = row.insertCell(1);
                    cell.innerHTML = results.rows.item(i).work;
                    cell = row.insertCell(2);
                    cell.innerHTML = results.rows.item(i).date;
                    cell = row.insertCell(3);
                    cell.innerHTML = results.rows.item(i).hour;
                    cell = row.insertCell(4);

                    if (Number(results.rows.item(i).remaininghour) < 0) {
                        row.style.backgroundColor = "red";
                        var temp = Number(results.rows.item(i).remaininghour) * -1;
                        cell.innerHTML = "OT ( " + temp + " )";
                    }
                    else {
                        cell.innerHTML = results.rows.item(i).remaininghour;
                    }

                    cell = row.insertCell(5);
                    var btn = document.createElement("BUTTON");
                    btn.innerHTML = "Edit";
                    btn.setAttribute("class", "edit");
                    btn.onclick = editRow;
                    cell.appendChild(btn);

                    cell = row.insertCell(6);
                    var deletebtn = document.createElement("BUTTON");
                    deletebtn.innerHTML = "Delete";
                    deletebtn.setAttribute("class", "delete");
                    deletebtn.onclick = deleteRow;
                    cell.appendChild(deletebtn);

                }
            }
        });
    });
}


function editRow() {
    var work, date, hour;
    let table = document.getElementById("myTable");

    var rows = table.getElementsByTagName("tr");

    for (i = 0; i < rows.length; i++) {
        rows[i].cells[5].onclick = function () {

            rIndex = this.parentElement.rowIndex;
            rowSubIndex = rIndex;
        }
    }

    setTimeout(editBtnDelay, 200);

    function editBtnDelay() {
        var editIcon = document.querySelectorAll(".edit");
        editIcon[rowSubIndex - 1].style.display = "none";

        document.getElementById("data-form").style.display = "block";
        document.getElementById("save").style.display = "inline";
        document.getElementById("cancel").style.display = "inline";

        work = table.rows[rowSubIndex].cells[1].innerHTML;
        date = table.rows[rowSubIndex].cells[2].innerHTML;
        hour = table.rows[rowSubIndex].cells[3].innerHTML;

        document.getElementById("work").value = work;
        document.getElementById("date").value = date;
        document.getElementById("hour").value = hour;
    }
}


function showTable() {
    document.getElementById("data-form").style.display = "block";
    document.getElementById("submit").style.display = "block";

}

function saveRow() {

    let table = document.getElementById("myTable");
    var hour = table.rows[rowSubIndex].cells[3].innerHTML;

    var work_val = document.getElementById("work").value;
    var date_val = document.getElementById("date").value;
    var hour_val = document.getElementById("hour").value;

    document.getElementById("work").value = "";
    document.getElementById("date").value = "";
    document.getElementById("hour").value = "";

    var editIcon = document.querySelectorAll(".edit");
    editIcon[rowSubIndex - 1].style.display = "block";

    document.getElementById("data-form").style.display = "none";
    document.getElementById("save").style.display = "none";
    document.getElementById("cancel").style.display = "none";

    let updatedTimestamp = new Date().toLocaleString();

    let userid = sessionStorage.getItem("uid");

    var noOfRowsAffectedByUpdate = 0;
    var breakpointIndex = 0;
    var tempHour = 0;


    db.transaction(function (tx) {
        tx.executeSql('SELECT logid,work,hour,remaininghour FROM INDIVIDUAL WHERE(uid=' + userid + ' AND date="' + date_val + '")', [], function (tx, results) {
            if (results.rows.length > 0) {
                for (var i = 0; i < results.rows.length; i++) {

                    var logIdAffected = Number(results.rows.item(i).logid);
                    var work = Number(results.rows.item(i).hour);
                    var workDescription = results.rows.item(i).work;

                    if (Number(work) === Number(hour)) {
                        breakpointIndex = i;
                    }

                    var remWork = Number(results.rows.item(i).remaininghour);

                    workInAffectedRows.push(workDescription);
                    logInAffectedRows.push(logIdAffected)
                    hourInAffectedRows.push(work);
                    remainingHourInAffectedRows.push(remWork);

                }
            }
            workInAffectedRows[breakpointIndex] = work_val;
            noOfRowsAffectedByUpdate = results.rows.length;

        });
    });

    setTimeout(updation, 600);

    function updation() {

        for (let j = breakpointIndex; j < noOfRowsAffectedByUpdate; j++) {

            if (j === breakpointIndex) {
                tempHour = Number(hour_val) - Number(hour);
                hourInAffectedRows[j] = Number(hour_val);
                remainingHourInAffectedRows[j] = remainingHourInAffectedRows[j] - tempHour;
            }
            else {
                remainingHourInAffectedRows[j] = remainingHourInAffectedRows[j] - tempHour;
            }

            console.log(workInAffectedRows[j] + " " + date_val + " " + hourInAffectedRows[j] + " " + remainingHourInAffectedRows[j]
                + " " + logInAffectedRows[j]);
        }

        let k = 0;
        k = breakpointIndex;

        var interval = setInterval(updateTable, 200);

        function updateTable() {
            console.log(k);
            if (k < noOfRowsAffectedByUpdate) {

                var updatedWork = workInAffectedRows[k];
                var updatedHour = hourInAffectedRows[k];
                var updatedRemainingHour = remainingHourInAffectedRows[k];
                var updatedLog = logInAffectedRows[k];

                console.log(updatedWork + " " + date_val + " " + updatedHour + " " + updatedRemainingHour
                    + " " + updatedTimestamp + " " + updatedLog);


                db.transaction(function (tx) {
                    tx.executeSql('update INDIVIDUAL set work= "' + updatedWork + '", date= "' + date_val + '", hour= "' + updatedHour + '", remaininghour="' + updatedRemainingHour + '",updatedTimestamp="' + updatedTimestamp + '" where (logid="' + updatedLog + '")');

                });
                k++;
            }
            else {
                console.log("Interval finised after k= " + k);
                clearInterval(interval);
            }
        }

        setTimeout(displayDelay, 600);

    }
}

function cancelChange() {

    document.getElementById("work").value = "";
    document.getElementById("date").value = "";
    document.getElementById("hour").value = "";

    var editIcon = document.querySelectorAll(".edit");
    editIcon[rowSubIndex - 1].style.display = "block";

    document.getElementById("data-form").style.display = "none";
    document.getElementById("save").style.display = "none";
    document.getElementById("cancel").style.display = "none";
}

function deleteRow() {
    var logid;
    let table = document.getElementById("myTable"), rIndex;

    console.log("Clicked");
    for (let i = 0; i < table.rows.length; i++) {

        table.rows[i].cells[6].onclick = function () {

            rIndex = this.parentElement.rowIndex;

            logid = table.rows[rIndex].cells[0].innerHTML;
        }
    }

    setTimeout(deletion, 300);

    function deletion() {
        console.log("Inside deletion");
        var noOfRowsAffectedByDelete = 0;
        let date = table.rows[rIndex].cells[2].innerHTML;
        var breakpointIndex = 0;
        let userid = sessionStorage.getItem("uid");

        db.transaction(function (tx) {
            tx.executeSql('SELECT logid,work,hour,remaininghour FROM INDIVIDUAL WHERE(uid=' + userid + ' AND date="' + date + '")', [], function (tx, results) {
                if (results.rows.length > 0) {
                    var totalWork = 0;
                    noOfRowsAffectedByDelete = results.rows.length;
                    console.log(noOfRowsAffectedByDelete);
                    for (var i = 0; i < results.rows.length; i++) {

                        var logIdAffected = Number(results.rows.item(i).logid);
                        var work = Number(results.rows.item(i).hour);
                        var remWork = Number(results.rows.item(i).remaininghour);
                        var workDescription = results.rows.item(i).work;

                        if (Number(logid) === Number(logIdAffected)) {
                            breakpointIndex = i;
                            work = 0;
                            remWork = 0;
                            logIdAffected = 0;

                            logInAffectedRows.push(logIdAffected);
                            workInAffectedRows.push(workDescription);
                            hourInAffectedRows.push(work);
                            remainingHourInAffectedRows.push(remWork);

                        }

                        else {

                            totalWork = totalWork + work;
                            remWork = 8 - totalWork;

                            workInAffectedRows.push(workDescription);
                            logInAffectedRows.push(logIdAffected)
                            hourInAffectedRows.push(work);
                            remainingHourInAffectedRows.push(remWork);
                        }



                        console.log(workInAffectedRows[i] + " " + date + " " + hourInAffectedRows[i] + " " + remainingHourInAffectedRows[i]
                            + " " + logInAffectedRows[i]);
                    }

                }

            });
        });

        var interval = setInterval(deleteTable, 600);
        let j = 0;
        function deleteTable() {
            console.log(j);
            if (j < noOfRowsAffectedByDelete) {

                if (j == breakpointIndex) {
                    db.transaction(function (tx) {
                        console.log("Im Deleted");
                        console.log(workInAffectedRows[j] + " " + date + " " + hourInAffectedRows[j] + " " + remainingHourInAffectedRows[j]
                            + " " + logInAffectedRows[j]);
                        tx.executeSql('DELETE FROM INDIVIDUAL WHERE(logid="' + logid + '")');
                    });

                    table.deleteRow(rIndex);
                    j++;
                }
                else {

                    var updatedWork = workInAffectedRows[j];
                    var updatedHour = hourInAffectedRows[j];
                    var updatedRemainingHour = remainingHourInAffectedRows[j];
                    var updatedLog = logInAffectedRows[j];
                    let updatedTimestamp = new Date().toLocaleString();

                    console.log(updatedWork + " " + date + " " + updatedHour + " " + updatedRemainingHour
                        + " " + updatedTimestamp + " " + updatedLog);

                    db.transaction(function (tx) {
                        tx.executeSql('update INDIVIDUAL set date= "' + date + '", hour= "' + updatedHour + '", remaininghour="' + updatedRemainingHour + '",updatedTimestamp="' + updatedTimestamp + '" where (logid="' + updatedLog + '")');

                    });
                    j++;
                }

            }
            else {
                console.log("Interval finised after j= " + j);
                clearInterval(interval);
            }
        }

        setTimeout(displayDelay, 2400);

    }

}

function displayDelay() {

    var element = document.getElementsByTagName("tr"), index;
    for (index = element.length - 1; index > 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }

    workInAffectedRows.length = 0;
    logInAffectedRows.length = 0;
    hourInAffectedRows.length = 0;
    remainingHourInAffectedRows.length = 0;

    displayEntries();
}

