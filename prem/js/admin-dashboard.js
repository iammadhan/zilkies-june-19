var clearSession = function () {
    sessionStorage.clear();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;

    dir = "asc";

    while (switching) {

        switching = false;
        rows = table.rows;
 
        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if(n===1) {
                if (dir == "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true;
                        document.getElementById("headerUID").textContent="User-ID(ASC)";
                        document.getElementById("headerDate").textContent="Date of Work";
                        break;
                    }
                } else if (dir == "desc") {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true;
                        document.getElementById("headerUID").textContent="User-ID(DESC)";
                        document.getElementById("headerDate").textContent="Date of Work";
                        break;
                    }
                }
            }
            else {
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        document.getElementById("headerUID").textContent="User-ID";
                        document.getElementById("headerDate").textContent="Date of Work(ASC)";
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        document.getElementById("headerDate").textContent="Date of Work(DESC)";
                        document.getElementById("headerUID").textContent="User-ID";
                        break;
                    }
                }
            }
            
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

var displayAllEntries = function () {
    let counter = 0;
    let table = document.getElementById("myTable");

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM INDIVIDUAL ORDER BY createdTimestamp DESC', [], function (tx, results) {
            if (results.rows.length > 0) {
                for (var i = 0; i < results.rows.length; i++) {
                    let row = table.insertRow();
                    let cell = row.insertCell(0);
                    cell.innerHTML = ++counter;

                    cell = row.insertCell(1);
                    cell.innerHTML = results.rows.item(i).uid;
                    cell = row.insertCell(2);
                    cell.innerHTML = results.rows.item(i).name;
                    cell = row.insertCell(3);
                    cell.innerHTML = results.rows.item(i).logid;
                    cell = row.insertCell(4);
                    cell.innerHTML = results.rows.item(i).work;
                    cell = row.insertCell(5);
                    cell.innerHTML = results.rows.item(i).date;
                    cell = row.insertCell(6);
                    cell.innerHTML = results.rows.item(i).hour;
                    cell = row.insertCell(7);
                    if (Number(results.rows.item(i).remaininghour) < 0) {
                        row.style.backgroundColor = "red";
                        var temp = Number(results.rows.item(i).remaininghour) * -1;
                        cell.innerHTML = "OT ( " + temp + " )";
                    }
                    else {
                        cell.innerHTML = results.rows.item(i).remaininghour;
                    }
                    cell = row.insertCell(8);
                    cell.innerHTML = results.rows.item(i).createdTimestamp;
                    cell = row.insertCell(9);
                    cell.innerHTML = results.rows.item(i).updatedTimestamp;

                }
            }
        });
    });
}