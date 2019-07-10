function register() {
    let userId = document.getElementById("user-id").value;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    if (userId.length == 0 || firstname.length == 0 || lastname.length == 0 || password.length == 0 || role.length == 0) {
        alert("Please fill all the fields");
    } else {
        let userInfo = JSON.parse(localStorage.getItem('users'));
        if (userInfo == null) {
            let userData = { "userId": userId, "firstname": firstname, "lastname": lastname, "role": role, "password": password };
            let users = [];
            users.push(userData);
            console.log(users);
            localStorage.setItem("users", JSON.stringify(users));
            location.href = "login.html";
        } else {
            let flag = 0;
            for (let i = 0; i < userInfo.length; i++) {
                if (userInfo[i]['userId'] == userId) {
                    alert("User Id already Exists. Please log in");
                    flag = 1;
                    break;
                }
            }
            if (flag != 1) {
                let userData = { "userId": userId, "firstname": firstname, "lastname": lastname, "role": role, "password": password };
                userInfo.push(userData);
                localStorage.setItem("users", JSON.stringify(userInfo));
                location.href = "login.html";
            }
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
    select.value = "";
}