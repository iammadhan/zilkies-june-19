(function() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        return;
    }
})();

function login() {
    let userId = document.getElementById("user-id").value;
    let password = document.getElementById("password").value;
    let userInfo;
    let flag = 0;

    if (userId.length > 0 && password.length > 0) {
        let request = window.indexedDB.open("WorkLog", 2),
            db, store, index, tx, store2, tx2;

        // request.onupgradeneeded = function(e) {
        //     let db = request.result,
        //         store = db.createObjectStore("currentUser", { keyPath: "userId" });
        // }
        request.onerror = function(event) {
            console.log("Error :" + event.target.error);
        }

        request.onsuccess = function(event) {
            db = request.result;
            tx2 = db.transaction("Users", "readwrite");
            store2 = tx2.objectStore("Users");


            db.error = function(e) {
                console.log("ERROR:" + e.target.error);
            }

            let userInfo = store2.getAll();

            userInfo.onsuccess = function() {
                userInfo = userInfo.result;
                console.log(userInfo);
                let flag = 0;
                for (let i = 0; i < userInfo.length; i++) {
                    console.log(userInfo[i]);
                    console.log("inside for");
                    console.log(userId);
                    console.log(parseInt(userInfo[i]['userId']) == parseInt(userId));
                    console.log(parseInt(userInfo[i]['userId']) != parseInt(userId));
                    console.log(userInfo[i]['userId'], userInfo[i]['password']);
                    if (parseInt(userInfo[i]['userId']) == parseInt(userId)) {
                        flag = 1;
                        console.log(flag);
                        if (userInfo[i]['password'] == password) {
                            // alert("Logged In");
                            let currentUser = { userId: userId, userName: userInfo[i]['firstname'] };
                            console.log(currentUser);
                            setCurrentUser(currentUser);
                            if (userInfo[i]['role'] == "Admin") {
                                location.href = "admin.html";
                            } else {
                                location.href = "form.html";
                            }

                        } else {
                            alert("Incorrect Password");
                            document.getElementById("password").value = "";
                        }
                        break;
                    }

                }
                if (flag == 0) {
                    alert("Incorrect Username. If not registered please register");
                    emptyInputs();
                }

            }
            tx2.oncomplete = function() {
                db.close;
            };

        }

    } else {
        alert("Please enter username and password to login.");
    }
    // emptyInputs();

}

function emptyInputs() {
    let input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
        input[i].value = "";
    }
}

function setCurrentUser(currentUser) {
    let request = window.indexedDB.open("WorkLog", 2),
        db, store, tx;

    request.onerror = function(event) {
        console.log("Error :" + event.target.error);
    }

    request.onsuccess = function(event) {
        db = request.result;
        console.log(db);
        tx = db.transaction("currentUser", "readwrite");
        store = tx.objectStore("currentUser");
        store.put(currentUser);

        tx.oncomplete = function() {
            db.close;
        };
    }
}