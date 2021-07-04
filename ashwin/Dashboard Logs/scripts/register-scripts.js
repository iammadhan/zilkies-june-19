function authState() {
    var bool = localStorage.getItem("sessionToken")
    if (bool) {
        window.location.href = "dashboard.html"
        console.log("Already logged in");
    }
}

// Taking care of Authentication states
authState();

function register(form) {

    var username = form.username.value;
    var password = form.password.value;
    var role = form.role.value


    if (username && password && role) {

        var users = JSON.parse(localStorage.getItem("users")) || []

        items = addUser(username, password, role)

        if (users) {

            var existingItems = JSON.parse(localStorage.getItem("users"))
            var bool = true
            existingItems.forEach((data) => {
                var existingUserName = data.username
                if (existingUserName == username) {
                    alert("Username already exists :(")
                    bool = false
                }
            })

            if (bool) {
                users.push(items)
                users = JSON.stringify(users)
                localStorage.setItem("users", users)
            }

            adminTokens(token)

        } else {

            users.push(items)
            users = JSON.stringify(users)
            localStorage.setItem("users", users)
            adminTokens(token)
        }
    } else {
        alert("Fill up all the fields :|")
    }

}

var addUser = function (name, password, role) {

    var newItem = {
        'username': name,
        'password': password,
        'role': role
    }
    return newItem
}