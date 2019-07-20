(function() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        return;
    }
})();

function register() {
    let userId = document.getElementById("user-id").value;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    if (userId.length == 0 || firstname.length == 0 || lastname.length == 0 || password.length == 0 || role.length == 0) {
        alert("Please fill all the fields");
    } else {
        let request = window.indexedDB.open("WorkLog", 2),
            db, store, index, tx;

        request.onupgradeneeded = function(e) {
            let db = request.result,
                store = db.createObjectStore("Users", { keyPath: "userId" }),
                index = store.createIndex("firstname", "firstname", { unique: false }),
                store2 = db.createObjectStore("currentUser", { keyPath: "userId" }),
                index2 = store.createIndex("currentUser", "userId", { unique: true });
        }

        request.onerror = function(event) {
            console.log("Error :" + event.target.error);
        }

        request.onsuccess = function(event) {
            db = request.result;
            tx = db.transaction("Users", "readwrite");
            store = tx.objectStore("Users");
            index = store.index("firstname");

            db.error = function(e) {
                console.log("ERROR:" + e.target.error);
            }

            let userInfo = store.getAll();

            userInfo.onsuccess = function() {
                userInfo = userInfo.result;
                console.log(userInfo);
                let flag = 0;
                for (let i = 0; i < userInfo.length; i++) {
                    if (userInfo[i]['userId'] == userId) {
                        alert("User Id already Exists. Please log in");
                        console.log(userInfo[i]);
                        flag = 1;
                        break;
                    }
                }
                if (flag != 1) {
                    store.put({ userId: userId, firstname: firstname, lastname: lastname, password: password, role: role });

                }
            }
            tx.oncomplete = function() {
                db.close;
                location.href = "login.html";
            };
        }
        emptyInputs();
    }
}

function emptyInputs() {
    let input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
        input[i].value = "";
    }
    let select = document.getElementsByTagName("select")[0];
    select.value = "Manager";
}