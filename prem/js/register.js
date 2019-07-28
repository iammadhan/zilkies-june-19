
var db = openDatabase('Worklog', '1.0', 'Worklog DB', 2 * 1024 * 1024);


var insert = function () {
    let userid = document.getElementById("userid").value;
    let fname = document.getElementById("firstname").value;
    let lname = document.getElementById("lastname").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    db.transaction(function (tx) {
        tx.executeSql('insert into ENTRY(uid, fname, lname, password, role) values(' + userid + ',"' +
            fname + '","' + lname + '","' + password + '","' + role + '")');
    });

    console.log("Registered");
}

