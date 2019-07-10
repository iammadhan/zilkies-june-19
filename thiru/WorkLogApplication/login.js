function login() {
    let userId = document.getElementById("user-id").value;
    let password = document.getElementById("password").value;
    let userInfo = JSON.parse(localStorage.getItem('users'));
    let flag = 0;
    if (userInfo != null) {
        if (userId.length > 0 && password.length > 0) {
            for (let i = 0; i < userInfo.length; i++) {
                if (userInfo[i]['userId'] == userId) {
                    if (userInfo[i]['password'] == password) {
                        // alert("Logged In");
                        localStorage.setItem('currentUserId', userId);
                        localStorage.setItem('currentUserName', userInfo[i]['firstname']);
                        if (userInfo[i]['role'] == "Admin") {
                            location.href = "admin.html";
                        } else {
                            location.href = "form.html";
                        }

                    } else {
                        alert("Incorrect Password");
                        document.getElementById("password").value = "";
                    }
                    flag = 1;
                    break;
                }
            }

            if (flag == 0) {
                alert("Incorrect Username. If not registered please register");
                emptyInputs();
            }
        } else {
            alert("Please enter username and password to login.");
        }
    } else {
        alert("No records found. Please register to login");
    }
    // emptyInputs();

}

function emptyInputs() {
    let input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
        input[i].value = "";
    }
}