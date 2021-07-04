function authState() {
    var bool = localStorage.getItem("sessionToken")
    if (bool) {
        window.location.href = "dashboard.html"
        console.log("Already logged in");
    }
}

// Taking care of Authentication States
authState();

function login() {

    var username = document.getElementById("username").value
    var password = document.getElementById("password").value;

    if (username && password) {
        if (username == "Admin" && password == "admin") {
            localStorage.setItem("sessionToken", "Admin")
            window.location.href = "dashboard.html"
        } else {
            loginUser(username, password)
        }
    }else {
        alert("Fill up all the fields :|")
    }

}

var loginUser = function (username, password) {

    var users = localStorage.getItem("users")
    var items = JSON.parse(users)

    var bool = false;

    items.forEach((data) => {
        if(data.username = username && data.password == password) {
            bool = true
        }
    })

    if (bool) {
        localStorage.setItem("sessionToken", username)
        window.location.href = "dashboard.html"
    } else {
        alert("Invalid Credentials")
    }

}