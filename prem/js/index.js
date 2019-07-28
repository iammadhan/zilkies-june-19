var db = openDatabase('Worklog', '1.0', 'Worklog DB', 2 * 1024 * 1024);


function create() {
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS ENTRY(uid unique, fname, lname, password, role )')
    });
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS INDIVIDUAL(uid, name, logid, work, date, hour, remaininghour,createdTimestamp,updatedTimestamp )')
    });
}



var loginValidation = function () {
    let userid = document.getElementById("userid").value;
    let password = document.getElementById("password").value;
    let link = document.getElementById("link");

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ENTRY WHERE (uid=' + userid + ' AND password="' + password + '")', [], function (tx, results) {
            if (results.rows.length > 0) {

                var name = results.rows.item(0).fname+" "+results.rows.item(0).lname;
                sessionStorage.setItem("uid",results.rows.item(0).uid);
                sessionStorage.setItem("name",name);

                console.log("Valid");

                if(results.rows.item(0).role==="Admin") {
                    link.href = "admindashboard.html"
                }
                else {
                    link.href = "dashboard.html"
                }
            }
            else {
                console.log("Not valid Login");
                link.href = "index.html";
            }
        });
    });
}


document.getElementById("login").addEventListener("click",function(){
    var element = document.getElementById("circular-container");
    var opacityArray = ["0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "0"];
    var x = 0;
    (function next() {
        element.style.opacity = opacityArray[x];
        if(++x < opacityArray.length) {
            setTimeout(next, 60); 
        }
    })();

    document.getElementById("container").style.zIndex="1";

});

